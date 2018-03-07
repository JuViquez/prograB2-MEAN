import { Component, OnInit } from '@angular/core';
import { Institucion } from '../institucion';
import { InstitucionService } from '../institucion.service';
import { EscuelaService } from '../../escuela/escuela.service';
import { Escuela } from '../../escuela/escuela';


@Component({
  selector: 'app-instituciones-list',
  templateUrl: './instituciones-list.component.html',
  styleUrls: ['./instituciones-list.component.css'],
  providers: [InstitucionService,EscuelaService]
})
export class InstitucionesListComponent implements OnInit {

  instituciones: Institucion[];
  selectedInstitucion: Institucion;
  noInstitucion: Boolean;
  inputInstitucion: string;
  sedes: any[];
  selectedSede: any;
  noSede: Boolean;
  inputSede: string;
  escuelas: any[];
  selectedEscuela: Escuela;
  noEscuela: Boolean;
  inputEscuela: string;

  selectInstitucion (event: any){
    this.sedes = [];
    this.escuelas = [];
    if(typeof(this.selectedInstitucion.nombre) == 'undefined'){
      //No encuentra Institución, se habilita la opción de crear una
      this.noInstitucion = true;
      this.noSede=true;
      this.noEscuela = true;
    }else{
      console.log(this.selectedInstitucion.nombre);
      this.sedes = this.selectedInstitucion.sedes;
      this.noInstitucion = false;
      this.noSede = false;
      this.noEscuela = false;
    }
  }
  
  selectSede(event: any){
    this.escuelas = [];
    //this.selectedSede = event.target.value;
    if(typeof(this.selectedSede.nombre) == 'undefined'){
      //No se encuentra sede, se habilita la opción de crear nueva
      this.noSede = true;  
      this.noEscuela = true;   
    }
    else{
      this.noSede = false;
      this.noEscuela = false;
      this.getNombreEscuelas(this.selectedSede.id_escuelas);
    }
  }

  selectEscuela(event: any){
    if(typeof(this.selectedEscuela.nombre) == 'undefined'){
      //No se encuentra escuela, se habilita la opción de crear nueva
      this.noEscuela = true;     
    }
    else{
      this.noEscuela = false;
    }
  }

  getNombreEscuelas(arreglo: string[]){
    this.escuelasService.getEscuelas(arreglo).then((data:Escuela[]) => { 
      this.escuelas = data; console.log("arreglo: "+this.escuelas);})}

  EnviarDocumento(){
    var InstitucionOutput = new Institucion;

    if(this.noInstitucion){
      var arr: string[];
      arr = new Array();
      arr.push(this.inputEscuela);
      InstitucionOutput.nombre = this.inputInstitucion;
      InstitucionOutput.sedes = [{nombre:this.inputSede,id_escuelas:arr}];
      console.log(InstitucionOutput);
    }
  }
  
  constructor(private institucionService: InstitucionService,private escuelasService: EscuelaService) {}

  ngOnInit() {
    this.sedes = new Array();
    this.noInstitucion = false;
    this.noSede = false;
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }


}