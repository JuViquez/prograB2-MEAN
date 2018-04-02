import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-malla-curricular',
  templateUrl: './malla-curricular.component.html',
  styleUrls: ['./malla-curricular.component.css'],
  providers : [UsuarioService,LoginService]
})
export class MallaCurricularComponent implements OnInit {

  usuario :Usuario;

  constructor(private usuarioService : UsuarioService, private loginService : LoginService) { }

  ngOnInit() {
    this.usuario = this.loginService.consultarDatos();
    this.usuarioService.getUsuario(this.usuario._id).then((data:Usuario)=>{this.usuario = data;})
  }

}
