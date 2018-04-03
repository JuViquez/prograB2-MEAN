import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Grupo } from '../../grupo/grupo';
import { GrupoService } from '../../grupo/grupo.service';
import {Router} from "@angular/router";
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component';


@Component({
  selector: 'app-malla-curricular',
  templateUrl: './malla-curricular.component.html',
  styleUrls: ['./malla-curricular.component.css'],
  providers : [UsuarioService,LoginService,GrupoService]
})
export class MallaCurricularComponent implements OnInit {

  usuario :Usuario;
  grupo : Grupo;
  profesor : Boolean;
  grupos : Grupo[];

  constructor(private router: Router ,private grupoService : GrupoService, private usuarioService : UsuarioService, private loginService : LoginService) { }

  setSelectedGrupo(e){
    this.grupoService.getGrupo(e.id_grupo).then((data:Grupo)=>{
      this.loginService.guardarGrupo(data);
      if(this.usuario.tipo=="estudiante"){
        this.router.navigate(['/grupo/home']);
      }else{
        this.router.navigate(['/grupo/evaluaciones']);
      }
    })
  }

  setSelectedGrupo2(e){
      this.loginService.guardarGrupo(e);
      if(this.usuario.tipo=="estudiante"){
        this.router.navigate(['/grupo/home']);
      }else{
        this.router.navigate(['/grupo/evaluaciones']);
      }
  }

  ngOnInit() {
    this.usuario = this.loginService.consultarDatos();
    if(this.usuario.tipo=="profesor"){
      this.profesor = true;
      this.grupoService.getGruposByProfesor(this.usuario._id).then((data:Grupo[])=>{
        this.grupos = data;
      })
    }else{
      this.profesor = false;
      this.usuarioService.getUsuario(this.usuario._id).then((data:Usuario)=>{this.usuario = data;})
    } 
  }

}
