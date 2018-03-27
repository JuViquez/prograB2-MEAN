import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../grupo.service';
import { Grupo } from '../../grupo';
import { ListaAsistencia } from '../../../models/lista-asistencia';
import { AsistenciaService } from '../asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
  providers: [GrupoService,AsistenciaService]
})
export class AsistenciaComponent implements OnInit {
  grupo: Grupo;
  listaAsistencia: ListaAsistencia; 
  listaGrupo : ListaAsistencia[]; //Lista de asistencia del grupo en sesión

   //generarLista: se rellena listaAsistencia con la lista de estudiantes del grupo
  generarLista(){
    this.listaAsistencia = new ListaAsistencia;
    this.listaAsistencia.asistencia = [];
    for(var x in this.grupo.lista_estudiantes){
      console.log(this.grupo.lista_estudiantes[x].id_estudiante);
      this.listaAsistencia.asistencia.push({id_estudiante : this.grupo.lista_estudiantes[x].id_estudiante,nombre: this.grupo.lista_estudiantes[x].nombre , estado : "ausente"}); 
    }
  }
 
  //actualiza el estado del estudiante, si está presente o no, cuando se selecciona el checkbox
  seleccionar(id_estudiante:string, isChecked: boolean) {
    var estudiante = this.listaAsistencia.asistencia.find(x => x.id_estudiante == id_estudiante);
    if (estudiante) {
      if(isChecked){
        estudiante.estado = "presente";
      }else{
        estudiante.estado = "ausente";
      }
    console.log("Lista:");
    for (var x in this.listaAsistencia.asistencia){console.log( this.listaAsistencia.asistencia[x].id_estudiante + " -> " + this.listaAsistencia.asistencia[x].estado)}
    }
  }

  setAsistencia(){
    if(typeof(this.listaAsistencia.id_grupo) == 'undefined'){
      this.grupoService.getGrupo("5aa7526784df143ac06a0105").then((data: Grupo) => { 
        this.grupo = data;
        console.log("GRUPO:"+ this.grupo.numero);
        this.generarLista();
      })
    }else{
      console.log("Seleccionado");
    }
  }

  guardarCambios(){
    if (typeof(this.listaAsistencia.id_grupo) == 'undefined'){
      this.listaAsistencia.fecha = new Date();
      this.listaAsistencia.id_grupo = "5aa7526784df143ac06a0105";
      this.asistenciaService.createAsistencia(this.listaAsistencia).then((data:ListaAsistencia)=>{});
    }else{
      console.log("ID: "+this.listaAsistencia._id);
      this.asistenciaService.updateGrupo(this.listaAsistencia).then((data:ListaAsistencia)=>{});
    }
  }

  constructor(private grupoService: GrupoService, private asistenciaService : AsistenciaService) { 
    this.listaGrupo = new Array();
    this.listaAsistencia = new ListaAsistencia;
    this.listaAsistencia.asistencia = [];
  }

  ngOnInit() {
    this.asistenciaService.getAsistenciasGrupo("5aa7526784df143ac06a0105").then((data: ListaAsistencia[]) => {
      console.log("Data length "+data.length);
      this.listaGrupo = data;
    } )
  }

}
