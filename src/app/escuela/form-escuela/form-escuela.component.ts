import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EscuelaService } from '../escuela.service'
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service'
import { NgForm } from '@angular/forms';
import { Escuela } from '../escuela';
import { Sede } from '../../models/sede';

@Component({
  selector: 'app-form-escuela',
  templateUrl: './form-escuela.component.html',
  styleUrls: ['./form-escuela.component.css'],
  providers: [EscuelaService, InstitucionService]
})
export class FormEscuelaComponent implements OnInit {

   instituciones: Institucion[];
   sedes: Sede[];
   selectedSede: Sede;
   selectedInstitucion: Institucion;
   escuelas: Escuela[];
   selectedEscuela: Escuela;

  constructor(private escuelaService: EscuelaService, 
              private institucionService: InstitucionService) { }

  ngOnInit() {
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }

  setSedes(sedes: Sede[]){
    this.sedes = sedes;
  }


  onSubmit(form: NgForm, event: String){
    switch(event) {
      case 'POST' : this.postClicked(form); break;
      default : break;
  }
    
  }

  postClicked(form: NgForm){
    var newEscuela = new Escuela();
    console.log(form.value);
    newEscuela.nombre = form.value.nombre;
    newEscuela.programas = []; 
    this.escuelaService.createEscuela(newEscuela).then((escuela: Escuela) => { 
      this.selectedInstitucion.sedes[this.sedes.indexOf(this.selectedSede)].id_escuelas.push(escuela._id);
      this.selectedEscuela = escuela;
      this.escuelas.push(escuela);
      this.institucionService.updateInstitucion(this.selectedInstitucion).then((institucion: Institucion) => {
        console.log(institucion);
      }
      )
    })
  }
}
