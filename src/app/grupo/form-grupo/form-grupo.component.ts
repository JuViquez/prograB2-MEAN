import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Escuela } from '../../escuela/escuela';
import { EscuelaService } from '../../escuela/escuela.service';
import { Curso } from '../../models/curso';
import { Programa } from '../../models/programa';
import { Grupo } from '../grupo'

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  styleUrls: ['./form-grupo.component.css'],
  providers: [LoginService,EscuelaService]
})
export class FormGrupoComponent implements OnInit {
  datos: any;
  selectedEscuela: Escuela;
  programas : Programa[];
  cursos : Curso[];
  selectedPrograma: Programa;
  selectedCurso :  Curso;
  createdGrupo : Grupo;

  setCursos(){
    this.cursos = this.selectedPrograma.malla_curricular;
  }

  constructor(private loginService: LoginService, private escuelaService : EscuelaService) { }

  ngOnInit() {
    this.datos = this.loginService.consultarDatos();
    this.createdGrupo =  new Grupo();
    this.escuelaService.getEscuelasByID(this.datos.escuela).then((data: Escuela) => { 
      this.selectedEscuela = data;
      this.programas = data.programas;
    });
  }

}
