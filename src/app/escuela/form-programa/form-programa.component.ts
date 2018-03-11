import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EscuelaService } from '../escuela.service'
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service'
import { NgForm } from '@angular/forms';
import { Escuela } from '../escuela';
import { Sede } from '../../models/sede';
import { Programa } from '../../models/programa';

@Component({
  selector: 'app-form-programa',
  templateUrl: './form-programa.component.html',
  styleUrls: ['./form-programa.component.css'],
  providers: [EscuelaService, InstitucionService]
})
export class FormProgramaComponent implements OnInit {

  instituciones: Institucion[];
  selectedInstitucion: Institucion;

  sedes: Sede[];
  selectedSede: Sede;
  
  escuelas: Escuela[];
  selectedEscuela: Escuela;

  programas: Programa[];
  selectedPrograma: Programa;

 constructor(private escuelaService: EscuelaService, 
             private institucionService: InstitucionService) { 
               
               this.selectedPrograma = new Programa();
               this.selectedPrograma.nombre = "";
               this.selectedPrograma.codigo_programa = "";
 }

 ngOnInit() {
   this.institucionService.getInstituciones().then((data: Institucion[]) => { 
     this.instituciones = data;
   })
 }

 setSedes(sedes: Sede[]){
   this.sedes = sedes;
 }

 getEscuelas(){
   this.escuelaService.getEscuelas(this.selectedSede.id_escuelas).then((escuelas: Escuela[]) =>{
     this.escuelas = escuelas;
   }
 
 )
 }

 setSelectedEscuela(escuela: Escuela){
   this.selectedEscuela = escuela;
 }

 setProgramas(programas: Programa[]){
   this.programas = programas;
 }
 
 setSelectedPrograma(programa: Programa){
   this.selectedPrograma = programa;
 }


 onSubmit(form: NgForm, event: String){
   switch(event) {
     case 'POST' : this.postClicked(form); break;
     case 'PUT'  : this.putClicked(form); break;
     case 'DELETE' : this.deleteClicked(); break;
     default : break;
 }
   
 }

 postClicked(form: NgForm){
   var newPrograma= new Programa();
   newPrograma.nombre = form.value.nombre;
   newPrograma.codigo_programa = form.value.codigo_programa;
   newPrograma.malla_curricular = [];
   var selectedEscuela = this.selectedEscuela;
   selectedEscuela.programas.push(newPrograma); 
   this.escuelaService.updateEscuela(selectedEscuela).then((escuela: Escuela) => { 
    this.escuelas.splice(this.escuelas.indexOf(this.selectedEscuela),1);
    this.escuelas.push(escuela);
     this.selectedEscuela = escuela;
   })
 }

 putClicked(form: NgForm){
 if(form.value.nombre != '' && form.value.codigo_programa !=''){
   var putPrograma = this.selectedPrograma;
   putPrograma.codigo_programa = form.value.codigo_programa;
   putPrograma.nombre = form.value.nombre;
   var putEscuela = new Escuela();
   putEscuela = this.selectedEscuela;
   putEscuela.programas.splice(putEscuela.programas.indexOf(this.selectedPrograma),1);
   putEscuela.programas.push(putPrograma);
   this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
     this.escuelas.splice(this.escuelas.indexOf(this.selectedEscuela),1);
     this.escuelas.push(escuela);
     this.selectedEscuela = escuela;
     this.programas = this.selectedEscuela.programas;
     this.selectedPrograma = putPrograma;
   })
 }

 }

 deleteClicked(){
  var putEscuela = new Escuela();
  putEscuela = this.selectedEscuela;
  putEscuela.programas.splice(putEscuela.programas.indexOf(this.selectedPrograma),1);
  this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
    this.escuelas.splice(this.escuelas.indexOf(this.selectedEscuela),1);
    this.escuelas.push(escuela);
    this.selectedEscuela = escuela;
    this.programas = this.selectedEscuela.programas;
    this.selectedPrograma = new Programa();
   })
 }
}
