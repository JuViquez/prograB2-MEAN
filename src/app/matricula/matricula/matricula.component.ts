import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component'
import { LoginService } from '../../login/login.service'
import { Usuario } from '../../usuario/usuario';
import { GrupoService } from '../../grupo/grupo.service'
import { Grupo } from '../../grupo/grupo';
import { Curso } from '../../models/curso';
import { InstitucionService } from '../../instituciones/institucion.service'
import { Institucion } from '../../instituciones/institucion';
import { ListaEstudiantes } from '../../models/lista-estudiantes';
import { HistorialCurso } from '../../models/historial-curso';
import { UsuarioService } from '../../usuario/usuario.service'

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
  providers: [LoginService, GrupoService, InstitucionService, UsuarioService]
})
//mantenimiento de una matricula a un grupo 
export class MatriculaComponent implements OnInit {
//Version Final
  session: Usuario

  grupos: Grupo[];
  gruposMatriculados: Grupo[];

  currentInstitucion: Institucion;
//crea la matricula
  constructor(private loginService: LoginService,
              private grupoService: GrupoService,
              private institucionService: InstitucionService,
              private usuarioService: UsuarioService) { 
                this.gruposMatriculados = [];
                this.grupos = [];
                this.currentInstitucion = new Institucion();
                this.currentInstitucion.nombre = "";
              }

  ngOnInit() {
    this.session = this.loginService.consultarDatos();
    var historialLength = this.session.historial_cursos.length;
    var codigosCurso = new Array();
    var gruposMatriculados = new Array();
    for(var i = 0; i < historialLength; i++){
      if(this.session.historial_cursos[i].estado == 'Aprobado'){
        codigosCurso.push(this.session.historial_cursos[i])
      }else
      if(this.session.historial_cursos[i].estado == 'Cursando'){
        gruposMatriculados.push(this.session.historial_cursos[i].id_grupo);
      }
    }
//al seleccionar un grupo el cupo se disminuye en 1, si no tiene cupos no deja que matricule
    this.institucionService.getInstitucionById(this.session.institucion.id_institucion).then((institucion: Institucion) => {
      this.currentInstitucion = institucion;
      this.grupoService.getGruposNoCursados(codigosCurso, institucion.periodo, this.session.programa.codigo_programa).then((grupos: Grupo[]) =>{
          for(var i = 0; i < grupos.length; i++){
            if(gruposMatriculados.indexOf(grupos[i]._id) != -1){
              this.gruposMatriculados.push(grupos[i]);
            }else{
              this.grupos.push(grupos[i]);
            }
          }
          
      });
    })
  }
//al ser clik, la matricula se crea con los cursos seleccionados
  matricularClicked( grupo: Grupo){
    if(grupo.cupos > 0 && !(this.gruposMatriculados.find(function(x){
      return x.curso.codigo_curso == grupo.curso.codigo_curso;
    })))
    {
      var newHistorial = this.iniciarHistorial(grupo);
      this.session.historial_cursos.push(newHistorial);
      this.loginService.guardarDatos(this.session);
      this.grupos.splice(this.grupos.indexOf(grupo),1);
      grupo.cupos--;
      var lista = new ListaEstudiantes();
      lista.id_estudiante = this.session._id;
      lista.nombre = this.session.nombre;
      lista.evaluaciones = [];
      grupo.lista_estudiantes.push(lista);
      this.gruposMatriculados.push(grupo);
    }
  }
 //al seleccionar el grupo matriculado, se puede desmatricular, se vuelven a guardar los cambios y ya queda desmatriculado de un curso
  desmatricularClicked(grupo: Grupo){
    var lista = new ListaEstudiantes();
    this.gruposMatriculados.splice(this.gruposMatriculados.indexOf(grupo),1);
    lista.id_estudiante = this.session._id;
    lista.evaluaciones = [];
    grupo.lista_estudiantes.splice(grupo.lista_estudiantes.indexOf(lista),1);
    grupo.cupos++;
    this.grupos.push(grupo);
    var newHistorial = this.iniciarHistorial(grupo);
    this.session.historial_cursos.splice(this.session.historial_cursos.indexOf(newHistorial),1);
    this.loginService.guardarDatos(this.session);
  }
//al estar matriculado, se inicia el historial del curso, y se asocia con todo lo creado
  private iniciarHistorial(grupo: Grupo){
    var newHistorial = new HistorialCurso();
    newHistorial.codigo_curso = grupo.curso.codigo_curso;
    newHistorial.estado = 'Cursando';
    newHistorial.id_grupo = grupo._id;
    newHistorial.nombre = grupo.curso.nombre;
    newHistorial.nota_final = 0;
    newHistorial.periodo = grupo.periodo;
    return newHistorial;
  }
//al confirmar la matricula ya queda el estudiante matriculado y con permisos en ese curso
  confirmarMatricula(){
    this.grupoService.updateManyGrupos(this.gruposMatriculados.concat(this.grupos));
    this.usuarioService.updateUsuario(this.session);
  }

  toStringHorario(Horario: any){
    var str = "";
    for(var i = 0; i < Horario.length; i++){
      str = str + Horario[i].dia + ' : ' + Horario[i].hora_inicio + ' - ' + Horario[i].hora_final + '\n';
    }
    return str;
  }
}
