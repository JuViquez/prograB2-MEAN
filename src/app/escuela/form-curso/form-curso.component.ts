import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EscuelaService } from '../escuela.service'
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service'
import { NgForm } from '@angular/forms';
import { Escuela } from '../escuela';
import { Sede } from '../../models/sede';
import { Programa } from '../../models/programa';
import { Curso } from '../../models/curso';
import { NavigationBarComponent } from "../../navigation/navigation-bar/navigation-bar.component"

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css'],
  providers: [EscuelaService, InstitucionService]
})
export class FormCursoComponent implements OnInit {

  instituciones: Institucion[];
  selectedInstitucion: Institucion;

  sedes: Sede[];
  selectedSede: Sede;
  
  escuelas: Escuela[];
  selectedEscuela: Escuela;

  programas: Programa[];
  selectedPrograma: Programa;

  cursos: Curso[];
  selectedCurso: Curso;

 constructor(private escuelaService: EscuelaService, 
             private institucionService: InstitucionService) { 
               
               this.selectedCurso = new Curso();
               this.selectedCurso.nombre = "";
               this.selectedCurso.codigo_curso = "";
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

 setCursos(cursos: Curso[]){
   this.cursos = cursos;
 }

setSelectedCurso(curso: Curso){
  this.selectedCurso = curso;
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
   var newCurso = new Curso();
   newCurso.nombre = form.value.nombre;
   newCurso.codigo_curso = form.value.codigo_curso;
   newCurso.temas = [];

   var selectedPrograma = this.selectedPrograma;
   selectedPrograma.malla_curricular.push(newCurso);
   
   var programas = this.programas;
   programas[programas.indexOf(this.selectedPrograma)] = selectedPrograma; 
   
   var selectedEscuela = this.selectedEscuela;
   selectedEscuela.programas = programas;
  
   this.escuelaService.updateEscuela(selectedEscuela).then((escuela: Escuela) => { 
    this.escuelas[this.escuelas.indexOf(this.selectedEscuela)] = escuela;
    this.selectedEscuela = escuela;
    this.programas = programas;
    this.selectedPrograma = selectedPrograma;
    this.cursos = selectedPrograma.malla_curricular;
    this.selectedCurso = newCurso;
     
   })
 }

 putClicked(form: NgForm){
 if(form.value.nombre != '' && form.value.codigo_curso !=''){
   
   var putCurso = this.selectedCurso;
   putCurso.codigo_curso = form.value.codigo_curso;
   putCurso.nombre = form.value.nombre;
   
   var putCursos = this.cursos;
   putCursos[putCursos.indexOf(this.selectedCurso)] = putCurso;
  
   var putProgramas = this.programas;
   var indexPrograma = putProgramas.indexOf(this.selectedPrograma);
   putProgramas[indexPrograma].malla_curricular = putCursos;

   var putEscuela = this.selectedEscuela;
   putEscuela.programas = putProgramas;

   this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
     this.escuelas[this.escuelas.indexOf(this.selectedEscuela)] = escuela;
     this.selectedEscuela = escuela;
     this.programas = putProgramas;
     this.cursos = this.programas[indexPrograma].malla_curricular;
     this.selectedCurso = putCurso;
   })
 }

 }

 deleteClicked(){
  var putProgramas = this.programas;
  var putPrograma = this.selectedPrograma;

  putPrograma.malla_curricular.splice(this.cursos.indexOf(this.selectedCurso),1);
  
  putProgramas[putProgramas.indexOf(this.selectedPrograma)] = putPrograma;

  var putEscuela = this.selectedEscuela;
  putEscuela.programas = putProgramas;

  this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
    this.escuelas[this.escuelas.indexOf(this.selectedEscuela)] = escuela;
    this.selectedEscuela = escuela;
    this.programas = putProgramas;
    this.selectedPrograma = putPrograma;
    this.cursos = this.selectedPrograma.malla_curricular;
    this.selectedCurso = new Curso();
   })
 }

}
