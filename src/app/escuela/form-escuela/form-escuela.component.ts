import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EscuelaService } from '../escuela.service'
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service'
import { NgForm } from '@angular/forms';
import { Escuela } from '../escuela';
import { Sede } from '../../models/sede';
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component' 


@Component({
  selector: 'app-form-escuela',
  templateUrl: './form-escuela.component.html',
  styleUrls: ['./form-escuela.component.css'],
  providers: [EscuelaService, InstitucionService]
})

//modelo para el mantenimiento de las escuelas
export class FormEscuelaComponent implements OnInit {
  

   instituciones: Institucion[];
   sedes: Sede[];
   selectedSede: Sede;
   selectedInstitucion: Institucion;
   escuelas: Escuela[];
   selectedEscuela: Escuela;
//constructor de una escuela
  constructor(private escuelaService: EscuelaService, 
              private institucionService: InstitucionService) { 
                
                this.selectedEscuela = new Escuela();
                this.selectedEscuela.nombre = "";
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


  onSubmit(form: NgForm, event: String){
    switch(event) {
      case 'POST' : this.postClicked(form); break;
      case 'PUT'  : this.putClicked(form); break;
      case 'DELETE' : this.deleteClicked(); break;
      default : break;
  }
    
  }

  //realiza el POST
  postClicked(form: NgForm){
    var newEscuela = new Escuela();
    newEscuela.nombre = form.value.nombre;
    newEscuela.programas = []; 
    this.escuelaService.createEscuela(newEscuela).then((escuela: Escuela) => { 
      this.selectedInstitucion.sedes[this.sedes.indexOf(this.selectedSede)].id_escuelas.push(escuela._id);
      this.selectedEscuela = escuela;
      this.escuelas.push(escuela);
      this.institucionService.updateInstitucion(this.selectedInstitucion);
    })
  }

  //Realiza el PUT
  putClicked(form: NgForm){
  if(form.value.nombre != ''){
    var putEscuela = new Escuela();
    putEscuela = this.selectedEscuela;
    putEscuela.nombre = form.value.nombre;
    this.escuelaService.updateEscuela(putEscuela).then((escuela: Escuela) => {
      this.selectedEscuela = escuela;
    })
  }

  }

  //Realiza el Deletee
  deleteClicked(){
    var itemId = this.selectedEscuela._id;
    this.escuelaService.DeleteEscuela(itemId).then((id: string) => {
      var index = this.selectedInstitucion.sedes[this.sedes.indexOf(this.selectedSede)].id_escuelas.indexOf(id);
      this.selectedInstitucion.sedes[this.sedes.indexOf(this.selectedSede)].id_escuelas.splice(index,1);
      this.institucionService.updateInstitucion(this.selectedInstitucion);
      this.sedes = this.selectedInstitucion.sedes;
      this.escuelas.splice(this.escuelas.indexOf(this.selectedEscuela),1);
      this.selectedEscuela = new Escuela();

    })
  }

}
