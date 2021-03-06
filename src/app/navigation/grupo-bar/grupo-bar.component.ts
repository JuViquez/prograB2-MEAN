import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../grupo/grupo.service';
import { Grupo } from '../../grupo/grupo';
import { LoginService } from '../../login/login.service';
import { Usuario } from '../../usuario/usuario';

@Component({
  selector: 'grupo-bar',
  templateUrl: './grupo-bar.component.html',
  styleUrls: ['./grupo-bar.component.css'],
  providers: [LoginService, GrupoService]
})
export class GrupoBarComponent implements OnInit {

  usuario : Usuario;
  profesor: Boolean;
  nombre: string;
  grupo : Grupo;

  constructor(private loginService : LoginService,
              private GrupoService: GrupoService) {}

  logOut(){
    this.loginService.logOut();
  }

  ngOnInit() {
    this.grupo = this.loginService.consultarGrupo();
    this.usuario =this.loginService.consultarDatos();
    this.nombre = this.usuario.nombre;
    if(this.usuario.tipo == "profesor"){
      this.profesor = true;
    }else{
      this.profesor = false;
    }
  }

}
