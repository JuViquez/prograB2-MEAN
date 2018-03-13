import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service'
import { Usuario } from '../../usuario/usuario';

@Component({
  selector: 'nav-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  providers : [LoginService]
})
export class NavigationBarComponent implements OnInit {
  usuario : Usuario;
  profesor: Boolean;
  nombre: string;

  constructor(private loginService : LoginService) {}

  logOut(){
    this.loginService.logOut();
  }

  ngOnInit() {
    this.usuario =this.loginService.consultarDatos();
    this.nombre = this.usuario.nombre;
    if(this.usuario.tipo == "profesor"){
      this.profesor = true;
    }else{
      this.profesor = false;
    }
  }

}
