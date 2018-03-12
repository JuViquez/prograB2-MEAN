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
import { Programa } from '../../models/programa';
import { LoginBarComponent } from '../../navigation/login-bar/login-bar.component';

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
  createdEstudiante : Usuario;
  

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required], 
      carnet: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  createEstudiante(){
    this.createdEstudiante.nombre =  this.form.get('nombre').value;
    this.createdEstudiante.email =  this.form.get('email').value;
    this.createdEstudiante.password =  this.form.get('password').value;
    this.createdEstudiante.carnet = this.form.get('carnet').value;
    this.createdEstudiante.institucion.nombre = this.selectedInstitucion._id;
    this.createdEstudiante.institucion.sede = this.selectedSede.nombre;
    this.createdEstudiante.escuela = this.selectedEscuela._id;
    this.createdEstudiante.tipo = "estudiante";
    this.createdEstudiante.programa.nombre = this.selectedPrograma.nombre;
    this.createdEstudiante.programa.codigo_programa = this.selectedPrograma.codigo_programa;
    this.usuarioService.createUsuario(this.createdEstudiante).then((usuario: Usuario) =>{
  })
  }

  setSedes(){
    this.sedes = this.selectedInstitucion.sedes;}

  getEscuelas(){
      this.escuelaService.getEscuelas(this.selectedSede.id_escuelas).then((escuelas: Escuela[]) =>{
        this.escuelas = escuelas;
    })}

  getProgramas(){
    this.programas = this.selectedEscuela.programas;
    this.emptyForm = false;
  }

  constructor(private formBuilder: FormBuilder, private usuarioService : UsuarioService , private institucionService: InstitucionService, private escuelaService : EscuelaService) { this.createForm(); }

  ngOnInit() {
    this.createdEstudiante = new Usuario();
    this.createdEstudiante.institucion = {nombre: "",sede: ""};
    this.createdEstudiante.programa = {nombre: "",codigo_programa: ""};
    this.createdEstudiante.historial_cursos = [];
    this.emptyForm = true;
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    })
  }

}
