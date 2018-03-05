import { Component, OnInit } from '@angular/core';
import { Institucion } from '../institucion';
import { InstitucionesService } from '../instituciones.service';

@Component({
  selector: 'app-instituciones-list',
  templateUrl: './instituciones-list.component.html',
  styleUrls: ['./instituciones-list.component.css'],
  providers: [InstitucionesService]
})
export class InstitucionesListComponent implements OnInit {

  instituciones: Institucion[];
  selectedInstitucion: Institucion;
  seleccionado: string;
  noInstitucion: Boolean;
  noSede: Boolean;
  sedes: string[];
  selectedSede: string;

  selectInstitucion (event: any){
    this.sedes = [];
    if(typeof(this.selectedInstitucion.nombre) == 'undefined'){
      //No encuentra Institución, se habilita la opción de crear una
      this.noInstitucion = true;
      this.noSede=true;
    }else{
      console.log(this.selectedInstitucion.nombre);
      for(var i in this.selectedInstitucion.sedes){console.log(this.selectedInstitucion.sedes[i].nombre);this.sedes.push(this.selectedInstitucion.sedes[i].nombre)}
      this.noInstitucion = false;
      this.noSede = false;
    }
  }

  selectSede(event: any){
    this.selectedSede = event.target.value;
    if(this.selectedSede){
      //Encuentra sede, se deshabilita la opción de crear nueva
      this.noSede = false;
    }
    else{
      this.noSede = true;
    }
  }

  constructor(private institucionService: InstitucionesService) {}

  ngOnInit() {
    this.sedes = new Array();
    this.noInstitucion = false;
    this.noSede = false;
    this.institucionService.getUsers().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }
}
