import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EscuelaService } from '../escuela.service'
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-escuela',
  templateUrl: './form-escuela.component.html',
  styleUrls: ['./form-escuela.component.css'],
  providers: [EscuelaService, InstitucionService]
})
export class FormEscuelaComponent implements OnInit {

   instituciones: Institucion[];
   sedes: JSON[];
   selectedSede: JSON;
   selectedInstitucion: Institucion;

  constructor(private escuelaService: EscuelaService, 
              private institucionService: InstitucionService) { }

  ngOnInit() {
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }

  setSedes(sedes: JSON[]){
    this.sedes = sedes;
  }

  onSubmit(form: NgForm){
    console.log(form.value.nombre);
  }
}
