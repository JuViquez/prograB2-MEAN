import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../grupo/grupo';
import { GrupoService } from '../../grupo/grupo.service';
import { evaluaciones } from '../evaluaciones';
import { EvaluacionesService } from '../evaluaciones.service'

@Component({
  selector: 'app-tabla-calificaciones',
  templateUrl: './tabla-calificaciones.component.html',
  styleUrls: ['./tabla-calificaciones.component.css'],
  providers : [GrupoService,EvaluacionesService]
})
export class TablaCalificacionesComponent implements OnInit {

  listaEvaluaciones : evaluaciones[];
  grupo : Grupo;
  filas : any[];
  available

  rellenarTabla(){
    var calificaciones : number[];
    var calificacion;
    var nota : number;
    for(var e in this.grupo.lista_estudiantes){
      calificaciones = [];
      for(var a in this.grupo.lista_estudiantes[e].evaluaciones){
        calificacion = (this.grupo.lista_estudiantes[e].evaluaciones[a].nota/100)*this.grupo.lista_estudiantes[e].evaluaciones[a].porcentaje;
        calificaciones.push(calificacion);
      }
      nota = calificaciones.reduce(function(a, b) { return a + b; }, 0);
      console.log(this.grupo.lista_estudiantes[e].nombre+" NOTA" +nota);
      this.filas.push({nombre:this.grupo.lista_estudiantes[e].nombre,calificaciones:calificaciones,nota:nota})
    }
  }

  constructor(private grupoService : GrupoService, private evaluacionesService : EvaluacionesService) { }

  ngOnInit() {
    this.grupoService.getGrupo("5abff382d1058d1754c806fc").then((data:Grupo)=>{
      this.grupo = data;
      this.evaluacionesService.getEvaluaciones(this.grupo._id).then((data2:evaluaciones[])=>{
        this.listaEvaluaciones = data2;
        this.filas = [];
        this.rellenarTabla();
      })
    })
  }

}
