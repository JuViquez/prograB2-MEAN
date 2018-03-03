import { Component, OnInit } from '@angular/core';
import { Institucion } from '../../instituciones/institucion';
import { InstitucionesService } from '../../instituciones/instituciones.service';
import {Usuario} from '../usuario';
import {UsuarioService} from '../usuario.service';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent implements OnInit {

  profesor: Usuario;

  constructor() { }

  ngOnInit() {
    this.profesor.tipo = "profesor";
  }
}
