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

  seleccionado: string

  selectChangeHandler (event: any){
    this.seleccionado = event.target.value;
  }

  constructor(private institucionService: InstitucionesService) {}

  ngOnInit() {
    this.institucionService.getUsers().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }
}
