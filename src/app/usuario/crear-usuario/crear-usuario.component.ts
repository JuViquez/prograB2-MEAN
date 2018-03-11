import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { InstitucionService } from '../../instituciones/institucion.service';
import { Institucion } from '../../instituciones/institucion';
import { Sede } from '../../models/sede';
import { Escuela } from '../../escuela/escuela';
import { EscuelaService } from '../../escuela/escuela.service';
import { Programa } from '../../models/programa'

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers : [UsuarioService,InstitucionService,EscuelaService]
})
export class CrearUsuarioComponent implements OnInit {
  instituciones : Institucion[];
  selectedInstitucion : Institucion;
  sedes : Sede[];
  selectedSede : Sede;
  escuelas : Escuela[];
  selectedEscuela : Escuela;
  form: FormGroup;
  programas : Programa[];
  selectedPrograma : Programa;
  emptyForm : Boolean;
  

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required], 
      carnet: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  createEstudiante(){

  }

  setSedes(){
    this.sedes = this.selectedInstitucion.sedes;}

  getEscuelas(){
      this.escuelaService.getEscuelas(this.selectedSede.id_escuelas).then((escuelas: Escuela[]) =>{
        this.escuelas = escuelas;
    })}

  getProgramas(){
    this.programas = this.selectedEscuela.programas;
  }

  constructor(private formBuilder: FormBuilder, private institucionService: InstitucionService, private escuelaService : EscuelaService) { this.createForm(); }

  ngOnInit() {
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }

}
