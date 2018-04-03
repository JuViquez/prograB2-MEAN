import { Component, OnInit } from '@angular/core';
import { Escuela } from '../../escuela/escuela';
import { EscuelaService } from '../../escuela/escuela.service';
import { evaluaciones } from '../../evaluaciones/evaluaciones';
import { EvaluacionesService } from '../../evaluaciones/evaluaciones.service';
import { Grupo } from '../../grupo/grupo';
import { GrupoService } from '../../grupo/grupo.service';
import { Usuario } from '../../usuario/usuario';
import { LoginService } from '../../login/login.service';
import { Asistencia } from '../../models/asistencia';
import {AsistenciaService} from '../../grupo/asistencia/asistencia.service';
import { ListaAsistencia } from '../../models/lista-asistencia';
import { GrupoBarComponent } from '../grupo-bar/grupo-bar.component';

@Component({
  selector: 'app-home-grupo',
  templateUrl: './home-grupo.component.html',
  styleUrls: ['./home-grupo.component.css'],
  providers : [EscuelaService,GrupoService,EvaluacionesService,LoginService, AsistenciaService]
})
export class HomeGrupoComponent implements OnInit {

  usuario : Usuario;
  escuela : Escuela;
  grupo : Grupo;
  temas : any[];
  rubros : evaluaciones[];
  selectedEvaluacion : any;
  visible : Boolean;
  asistencia : any[];


  constructor(private asistenciaService: AsistenciaService, private loginService : LoginService, private evaluacionesService : EvaluacionesService, private escuelaService : EscuelaService, private grupoService : GrupoService) { }

  rellenarListaTemas(){
    var programa = this.escuela.programas.find(y => y.codigo_programa == this.grupo.curso.codigo_programa);
    var malla = programa.malla_curricular.find(x => x.codigo_curso == this.grupo.curso.codigo_curso);
    this.temas = malla.temas;
  }
//var estudiante = this.grupo.lista_estudiantes.find(x => x.id_estudiante == this.usuario._id)
  rellenarRubros(){
    this.evaluacionesService.getEvaluaciones(this.grupo._id).then((evaluaciones : evaluaciones[])=>{
      this.rubros = evaluaciones;
      this.rellenarAsistencia();
    })
  }

  rellenarAsistencia(){
    this.asistenciaService.getAsistenciasGrupo(this.grupo._id).then((data:ListaAsistencia[])=>{
      var estudiante;
      for(var e in data){
        estudiante = data[e].asistencia.find(x => x.id_estudiante == this.usuario._id);
        this.asistencia.push({fecha:data[e].fecha,estado:estudiante.estado});
        console.log("Data")
      }
    })}

  setSelectedEvaluacion(v:evaluaciones){
    if(!this.visible){this.visible=true;}
    var estudiante = this.grupo.lista_estudiantes.find(x => x.id_estudiante == this.usuario._id)
    var nota = estudiante.evaluaciones.find(y => y.id_evaluacion == v._id);
    var total = (nota.nota/100)*nota.porcentaje;
    this.selectedEvaluacion = {nombre:v.nombre,fecha:v.fecha_entrega,tipo:v.tipo,porcentaje:v.porcentaje,nota:nota.nota,total:total}
  }

  ngOnInit() {
    this.grupo = this.loginService.consultarGrupo();
    this.grupoService.getGrupo(this.grupo._id).then((data : Grupo)=>{
      this.grupo = data;
      this.visible = false;
      this.asistencia = [];
      this.selectedEvaluacion = {nombre:"",fecha:"",tipo:"",porcentaje:"",nota:"",total:""}
      this.escuelaService.getEscuelasByID(this.grupo.id_escuela).then((escuela:Escuela)=>{
        this.escuela = escuela;
        this.usuario = this.loginService.consultarDatos();
        this.rellenarListaTemas();
        this.rellenarRubros();
      })
    })
  }

}
