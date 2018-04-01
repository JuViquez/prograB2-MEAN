import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service'
import { LoginService } from '../../login/login.service'
import { NavigationBarComponent } from "../../navigation/navigation-bar/navigation-bar.component"

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
  providers : [UsuarioService,LoginService]
})
export class FormUsuarioComponent implements OnInit {
  currentUsuario : Usuario;
  form: FormGroup;
  datos : any;

  constructor(private formBuilder: FormBuilder, private loginService : LoginService , private usuarioService :  UsuarioService) { this.createForm(); this.currentUsuario = new Usuario();
    this.datos = this.loginService.consultarDatos();
    this.usuarioService.getUsuario(this.datos._id).then((data: Usuario) => { this.currentUsuario = data; console.log("NOMBRE: "+this.currentUsuario.nombre)} )
 }

 EditUsuario(){
   this.usuarioService.updateUsuario(this.currentUsuario).then((data : Usuario) => {this.currentUsuario = data} );
 }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required], 
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
