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

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
  providers: [LoginService, GrupoService, InstitucionService]
})
export class MatriculaComponent implements OnInit {

  session: Usuario

  grupos: Grupo[];
  gruposMatriculados: Grupo[];

  currentInstitucion: Institucion;

  constructor(private loginService: LoginService,
              private grupoService: GrupoService,
              private institucionService: InstitucionService) { 
                this.gruposMatriculados = [];
              }

  ngOnInit() {
    this.session = this.loginService.consultarDatos();
    var historialLength = this.session.historial_cursos.length;
    var codigosCurso = new Array();
    for(var i = 0; i < historialLength; i++){
      if(this.session.historial_cursos[i].estado == 'Aprobado'){
        codigosCurso.push(this.session.historial_cursos[i])
      }
    }/*
    this.institucionService.getInstitucionById(this.session.institucion.id_institucion).then((institucion: Institucion) => {
      console.log(institucion);
      this.currentInstitucion = institucion;
      this.grupoService.getGruposNoCursados(codigosCurso, institucion.periodo).then((grupos: Grupo[]) =>{
        this.grupos = grupos;
      });
    })
   */
   
  }

  matricularClicked( grupo: Grupo){
    if(grupo.cupos > 0 && !this.gruposMatriculados.find(function(x){
      return x.curso == grupo.curso;
    }))
    {
      var newHistorial = this.iniciarHistorial(grupo);
      this.session.historial_cursos.push(newHistorial);
      this.grupos.splice(this.grupos.indexOf(grupo),1);
      grupo.cupos--;
      var lista = new ListaEstudiantes();
      lista.id_estudiante = this.session._id;
      lista.evaluaciones = [];
      grupo.lista_estudiantes.push(lista);
      this.gruposMatriculados.push(grupo);
    }
  }
 
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
  }

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
}
