import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EscuelaService } from '../escuela.service'
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service'
import { NgForm } from '@angular/forms';
import { Escuela } from '../escuela';
import { Sede } from '../../models/sede';
import { Programa } from '../../models/programa';
import { Curso } from '../../models/curso';
import { Tema } from '../../models/tema';



@Component({
  selector: 'app-form-tema',
  templateUrl: './form-tema.component.html',
  styleUrls: ['./form-tema.component.css'],
  providers: [EscuelaService, InstitucionService]
})
export class FormTemaComponent implements OnInit {

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

  temas: Tema[];
  selectedTema: Tema;

  subtemas: String[];

 constructor(private escuelaService: EscuelaService, 
             private institucionService: InstitucionService) { 
               
               this.selectedTema= new Tema();
               this.selectedTema.nombre = "";
               this.selectedTema.subtemas = [];
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

setTemas(temas: Tema[]){
  this.temas = temas;
}

setSelectedTema(tema: Tema){
 this.selectedTema = tema;
 this.subtemas = tema.subtemas;
}

setSubtemas(subtemas: String[]){
  this.subtemas = subtemas;
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
  
    var newTema = new Tema();
    newTema.nombre = form.value.nombre;
    newTema.subtemas = [];

    var putTemas = this.temas;
    putTemas.push(newTema);

    var putCurso = this.selectedCurso;
    putCurso.temas = putTemas;
    var putCursos = this.cursos;
    putCursos[putCursos.indexOf(this.selectedCurso)] = putCurso;

    var putPrograma = this.selectedPrograma;
    putPrograma.malla_curricular = putCursos;
    var putProgramas = this.programas;
    putProgramas[putProgramas.indexOf(this.selectedPrograma)] = putPrograma

    var putEscuela = this.selectedEscuela;
    putEscuela.programas = putProgramas;

   this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => { 
    this.escuelas[this.escuelas.indexOf(this.selectedEscuela)] = escuela;
    this.selectedEscuela = escuela;
    this.programas = putProgramas;
    this.selectedPrograma = putPrograma;
    this.cursos = putCursos;
    this.selectedCurso = putCurso;
    this.temas = putTemas;
    this.selectedTema = newTema;
   })
 }

 putClicked(form: NgForm){
 if(form.value.nombre){
   
  var putTema = this.selectedTema;
  putTema.nombre = form.value.nombre;

  var putTemas = this.temas;
  putTemas[putTemas.indexOf(this.selectedTema)] = putTema;

  var putCurso = this.selectedCurso;
  putCurso.temas = putTemas;
  var putCursos = this.cursos;
  putCursos[putCursos.indexOf(this.selectedCurso)] = putCurso;

  var putPrograma = this.selectedPrograma;
  putPrograma.malla_curricular = putCursos;
  var putProgramas = this.programas;
  putProgramas[putProgramas.indexOf(this.selectedPrograma)] = putPrograma

  var putEscuela = this.selectedEscuela;
  putEscuela.programas = putProgramas;

   this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
    this.escuelas[this.escuelas.indexOf(this.selectedEscuela)] = escuela;
    this.selectedEscuela = escuela;
    this.programas = putProgramas;
    this.selectedPrograma = putPrograma;
    this.cursos = putCursos;
    this.selectedCurso = putCurso;
    this.temas = putTemas;
    this.selectedTema = putTema;
   })
 }

 }

 deleteClicked(){
  var putTemas = this.temas;
  putTemas.splice(putTemas.indexOf(this.selectedTema),1);

  var putCurso = this.selectedCurso;
  putCurso.temas = putTemas;
  var putCursos = this.cursos;
  putCursos[putCursos.indexOf(this.selectedCurso)] = putCurso;

  var putPrograma = this.selectedPrograma;
  putPrograma.malla_curricular = putCursos;
  var putProgramas = this.programas;
  putProgramas[putProgramas.indexOf(this.selectedPrograma)] = putPrograma

  var putEscuela = this.selectedEscuela;
  putEscuela.programas = putProgramas;

   this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
    this.escuelas[this.escuelas.indexOf(this.selectedEscuela)] = escuela;
    this.selectedEscuela = escuela;
    this.programas = putProgramas;
    this.selectedPrograma = putPrograma;
    this.cursos = putCursos;
    this.selectedCurso = putCurso;
    this.temas = putTemas;
    this.selectedTema = new Tema();
   })
 }

}


