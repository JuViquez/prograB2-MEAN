import { Component, OnInit } from '@angular/core';
import { Institucion } from '../../instituciones/institucion';
import { InstitucionService } from '../../instituciones/institucion.service';
import {Usuario} from '../usuario';
import {UsuarioService} from '../usuario.service';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css'],
  providers: [InstitucionService]
})
export class CrearProfesorComponent implements OnInit {
  instituciones: Institucion[];
  profesor: Usuario;
  institucionSeleccionada: Institucion;

  selectInstitucion (event: any){
    console.log("Inicio de funcion");
    if(typeof(this.institucionSeleccionada.nombre) == 'undefined'){
      console.log("NULO")
    }else{
      console.log(this.institucionSeleccionada.nombre);
    }
  }

  constructor(private institucionService: InstitucionService) { }

  ngOnInit() {
    this.profesor = new Usuario();
    this.profesor.tipo = "profesor";
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }
}
