import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Escuela } from '../../escuela/escuela';
import { EscuelaService } from '../../escuela/escuela.service';
import { Curso } from '../../models/curso';
import { Programa } from '../../models/programa';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { NavigationBarComponent } from "../../navigation/navigation-bar/navigation-bar.component"


@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  styleUrls: ['./form-grupo.component.css'],
  providers: [LoginService,EscuelaService,GrupoService]
})
export class FormGrupoComponent implements OnInit {
  datos: any;
  selectedEscuela: Escuela;
  programas : Programa[];
  cursos : Curso[];
  selectedPrograma: Programa;
  selectedCurso :  Curso;
  createdGrupo : Grupo;
  form: FormGroup;
  conHorarios : Boolean;
  horarios : any;
  selectedHorario: any;

  createGrupo(){
    this.createdGrupo.curso = { codigo_curso: this.selectedCurso.codigo_curso, nombre: this.selectedCurso.nombre};
    this.createdGrupo.horario = this.horarios;
    this.grupoService.createGrupo(this.createdGrupo).then((data : Grupo)=>{})
  }

  createForm() {
    this.form = this.formBuilder.group({
      dia: ['', Validators.required], 
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });
  }

  BorrarHorario(){
    var index = this.horarios.indexOf(this.selectedHorario);
    if (index !== -1) {this.horarios.splice(index, 1)};
    this.selectedHorario = {dia:"",hora_inicio: "", hora_final:""};
    if(this.horarios.length==0){this.conHorarios=false;}
  }

  setSelectedHorario(h: any){
    this.selectedHorario = h;
  }

  HorarioSubmit(){
    this.horarios.push({dia : this.form.get('dia').value,hora_inicio : this.form.get('inicio').value, hora_final: this.form.get('fin').value });
    this.conHorarios = true;
    this.form.controls['dia'].setValue("");
    this.form.controls['inicio'].setValue("");
    this.form.controls['fin'].setValue("");
  }

  setCursos(){
    this.cursos = this.selectedPrograma.malla_curricular;
  }

  constructor(private grupoService : GrupoService, private formBuilder: FormBuilder, private loginService: LoginService, private escuelaService : EscuelaService) { this.createForm(); }

  ngOnInit() {
    this.selectedHorario = {dia:"",hora_inicio: "", hora_final:""};
    this.horarios = new Array();
    this.conHorarios = false;
    this.datos = this.loginService.consultarDatos();
    this.createdGrupo =  new Grupo();
    this.createdGrupo.id_escuela = this.datos.escuela;
    this.createdGrupo.id_profesor = this.datos.id;
    this.createdGrupo.id_institucion = this.datos.institucion;
    this.createdGrupo.cupos = 0;
    this.createdGrupo.numero = 0;
    this.createdGrupo.sede = this.datos.sede;
    this.escuelaService.getEscuelasByID(this.datos.escuela).then((data: Escuela) => { 
      this.selectedEscuela = data;
      this.programas = data.programas;
    });
  }

}
