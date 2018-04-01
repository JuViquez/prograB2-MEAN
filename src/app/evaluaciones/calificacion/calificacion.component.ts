import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../grupo/grupo';
import { GrupoService } from '../../grupo/grupo.service';
import { evaluaciones } from '../evaluaciones';
import { EvaluacionesService } from '../evaluaciones.service'

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css'],
  providers : [GrupoService,EvaluacionesService]
})
export class CalificacionComponent implements OnInit {

  grupo:Grupo;
  listaEvaluaciones : evaluaciones[];
  selectedEvaluacion : evaluaciones;
  listaCalificaciones: any[];
  guardar : boolean;

  //Se rellena la lista de evluaciones por estudiante, para poder mostrar la tabla de calificación
  setSelectedEvaluacion(e:evaluaciones){
    this.selectedEvaluacion = e;
    this.listaCalificaciones = [];
    this.guardar = false;
    var evalEst;
    for(var a in this.grupo.lista_estudiantes){
      evalEst = this.grupo.lista_estudiantes[a].evaluaciones.find(x => x.id_evaluacion == this.selectedEvaluacion._id);
      this.listaCalificaciones.push({id_estudiante:this.grupo.lista_estudiantes[a].id_estudiante,nombre:this.grupo.lista_estudiantes[a].nombre,id_evaluacion:evalEst.id_evaluacion,nota:evalEst.nota})
    }
    this.guardar = true;
  }

  guardarNota(){
    this.guardar = false;
    var estudiante;
    var evalEst;
    for(var e in this.listaCalificaciones){
      estudiante = this.grupo.lista_estudiantes.find(x => x.id_estudiante == this.listaCalificaciones[e].id_estudiante);
      evalEst = estudiante.evaluaciones.find(y => y.id_evaluacion == this.listaCalificaciones[e].id_evaluacion);
      evalEst.nota = this.listaCalificaciones[e].nota;
    }
    this.grupoService.updateGrupo(this.grupo).then((resultado:Grupo)=>{this.guardar = true;})
  }

  constructor(private grupoService : GrupoService, private evaluacionService : EvaluacionesService) { }

  ngOnInit() {
    this.guardar = false;
    this.listaCalificaciones=[];
    this.grupoService.getGrupo("5abff382d1058d1754c806fc").then((data:Grupo)=>{
      this.grupo = data;
      this.evaluacionService.getEvaluaciones(this.grupo._id).then((evaluacionArray:evaluaciones[])=>{this.listaEvaluaciones = evaluacionArray})
    })
  }

}
