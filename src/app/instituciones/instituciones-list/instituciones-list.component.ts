import { Component, OnInit } from '@angular/core';
import { Institucion } from '../institucion';
import { InstitucionesService } from '../instituciones.service';
import { EscuelaService } from '../../escuela/escuela.service';
import { Escuela } from '../../escuela/escuela';


@Component({
  selector: 'app-instituciones-list',
  templateUrl: './instituciones-list.component.html',
  styleUrls: ['./instituciones-list.component.css'],
  providers: [InstitucionesService,EscuelaService]
})
export class InstitucionesListComponent implements OnInit {

  instituciones: Institucion[];
  selectedInstitucion: Institucion;
  seleccionado: string;
  noInstitucion: Boolean;
  noSede: Boolean;
  sedes: any[];
  selectedSede: any;
  //escuelasService: EscuelaService;
  escuelas: Escuela[];

  selectInstitucion (event: any){
    this.sedes = [];
    if(typeof(this.selectedInstitucion.nombre) == 'undefined'){
      //No encuentra Institución, se habilita la opción de crear una
      this.noInstitucion = true;
      this.noSede=true;
    }else{
      console.log(this.selectedInstitucion.nombre);
      this.sedes = this.selectedInstitucion.sedes;
      this.noInstitucion = false;
      this.noSede = false;
    }
  }

  selectSede(event: any){
    //this.selectedSede = event.target.value;
    if(typeof(this.selectedSede.nombre) == 'undefined'){
      //No se encuentra sede, se habilita la opción de crear nueva
      this.noSede = true;     
    }
    else{
      this.noSede = false;
      console.log("-> "+this.selectedSede.id_escuelas);
      this.getNombreEscuelas(this.selectedSede.id_escuelas);
    }
  }

  getNombreEscuelas(arreglo: string[]){
    this.escuelasService.getEscuelas(arreglo).then((data: Escuela[]) => { 
      this.escuelas = data;})
    console.log("arreglo: "+this.escuelas);
  }

  constructor(private institucionService: InstitucionesService,private escuelasService: EscuelaService) {}

  ngOnInit() {
    this.sedes = new Array();
    this.noInstitucion = false;
    this.noSede = false;
    this.institucionService.getUsers().then((data: Institucion[]) => { 
      this.instituciones = data;
    })/*
    this.selectedInstitucion.nombre="UNED";
    this.selectedInstitucion.sedes.push({nombre:"Guadalupe",id_escuelas:[]});
    this.institucionService.getUsers().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
*/
  }
}
