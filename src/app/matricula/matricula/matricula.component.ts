import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component'
import { LoginService } from '../../login/login.service'
import { Usuario } from '../../usuario/usuario';
import { GrupoService } from '../../grupo/grupo.service'
import { Grupo } from '../../grupo/grupo';
import { Curso } from '../../models/curso';
import { InstitucionService } from '../../instituciones/institucion.service'
import { Institucion } from '../../instituciones/institucion';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
  providers: [LoginService, GrupoService, InstitucionService]
})
export class MatriculaComponent implements OnInit {

  session: Usuario

  cursos: any[];
  selectedCurso: string;

  grupos: Grupo[];
  idsGruposMatriculados: string[];
  nombresProfesor: string;

  currentInstitucion: Institucion;

  constructor(private loginService: LoginService,
              private grupoService: GrupoService,
              private institucionService: InstitucionService) { 
                this.selectedCurso = "";
              }

  ngOnInit() {
    this.session = this.loginService.consultarDatos();
    console.log(this.session);
    var historialLength = this.session.historial_cursos.length;
    var codigosCurso = new Array();
    for(var i = 0; i < historialLength; i++){
      if(this.session.historial_cursos[i].estado == 'Aprobado'){
        codigosCurso.push(this.session.historial_cursos[i])
      }
    }
    this.institucionService.getInstitucionById(this.session.institucion.id_institucion).then((institucion: Institucion) => {
      console.log(institucion);
      this.currentInstitucion = institucion;
      this.grupoService.getGruposNoCursados(codigosCurso, institucion.periodo ).then((grupos: Grupo[]) =>{
        this.grupos = grupos;
        this.cursos = this.grupos.map(function(grupo){
          return grupo.curso;
        }).filter(function(item,pos,array){
          return array.indexOf(item) == pos;
        })
        
      });
    })
   
   
  }

  matricularClicked(checked: boolean, grupo: Grupo){
    var putGrupo = grupo;
    if(checked){
      var listaEstudiantes = putGrupo.lista_estudiantes.map(function(x){ return x.id_estudiante })
      putGrupo.lista_estudiantes.splice(listaEstudiantes.indexOf(this.session._id),1);
      putGrupo.cupos++;
      this.idsGruposMatriculados.splice(this.idsGruposMatriculados.indexOf(putGrupo._id),1);
    }
    else{
      putGrupo.lista_estudiantes.push({id_estudiante: this.session._id, evaluaciones: []});
      putGrupo.cupos--;
      this.idsGruposMatriculados.push(putGrupo._id);
    }
    console.log(putGrupo);
    this.grupos[this.grupos.indexOf(grupo)] = putGrupo;
    return !checked;
  }

  setSelectedCurso(codCurso: string){
    this.selectedCurso = codCurso;
  }

  checkGrupo(grupo: Grupo){
    return this.idsGruposMatriculados.indexOf(grupo._id) != -1 && grupo.cupos > 0;
  }


}
