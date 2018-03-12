import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component'
import { LoginService } from '../../login/login.service'
import { Usuario } from '../../usuario/usuario';
import { GrupoService } from '../../grupo/grupo.service'

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
  providers: [LoginService, GrupoService]
})
export class MatriculaComponent implements OnInit {

  session: Usuario

  constructor(private loginService: LoginService,
              private grupoService: GrupoService) { }

  ngOnInit() {
    this.session = this.loginService.consultarDatos();
    var historialLength = this.session.historial_cursos.length;
    for(var i = 0; i < historialLength; i++){
      
    }
    console.log(this.session);
  }



}
