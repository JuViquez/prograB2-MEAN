import { Component, OnInit } from '@angular/core';
import { Institucion } from '../../instituciones/institucion';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { LoginService } from '../../login/login.service'
import { Router } from "@angular/router";
import { LoginBarComponent } from '../../navigation/login-bar/login-bar.component';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css'],
  providers: [UsuarioService,LoginService]
})
export class CrearProfesorComponent implements OnInit {
  instituciones: Institucion[];
  profesor: Usuario;
  creadorVar: Boolean;
  errMessage: Boolean;

  onNotifyEvent(objeto : any){
    this.creadorVar = false;
    if(typeof(objeto.nombre) != 'undefined' && typeof(objeto.sede) != 'undefined' && typeof(objeto.escuela) != 'undefined'){
      this.errMessage = true;
      this.profesor.escuela = objeto.escuela;
      this.profesor.institucion = {nombre: objeto.nombre, sede: objeto.sede};
      this.usuarioService.createUsuario(this.profesor).then((data: Usuario ) => {});
    }else{
      this.errMessage = false;
    }
  }

  constructor(private router: Router,private loginService: LoginService ,private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.errMessage = true;
    this.creadorVar = true;
    this.profesor = new Usuario();
    this.profesor.tipo = "profesor"; 
  }
}