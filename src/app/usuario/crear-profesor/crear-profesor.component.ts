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
  errMessage: number;

  onNotifyEvent(objeto : any){
    this.creadorVar = false;
    if(typeof(this.profesor.password) != 'undefined' && typeof(this.profesor.carnet) != 'undefined' && typeof(this.profesor.email) != 'undefined' && typeof(this.profesor.nombre) != 'undefined' && typeof(objeto.nombre) != 'undefined' && typeof(objeto.sede) != 'undefined' && typeof(objeto.escuela) != 'undefined'){
      this.errMessage = 1;
      this.profesor.escuela = objeto.escuela;
      this.profesor.institucion = { id_institucion: objeto.nombre , sede: objeto.sede};
      this.usuarioService.createUsuario(this.profesor).then((data: Usuario ) => {});
    }else{
      console.log("ERROR!!!")
      this.errMessage = 2;
    }
  }

  constructor(private router: Router,private loginService: LoginService ,private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.errMessage = 0;
    this.creadorVar = true;
    this.profesor = new Usuario();
    this.profesor.tipo = "profesor"; 
  }
}