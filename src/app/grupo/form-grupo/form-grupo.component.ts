import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Escuela } from '../../escuela/escuela';
import { EscuelaService } from '../../escuela/escuela.service';
import { Curso } from '../../models/curso';
import { Programa } from '../../models/programa';
import { Grupo } from '../grupo';
import { Tema } from '../../models/tema';
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
//mantenimiento de un grupo
export class FormGrupoComponent implements OnInit {
  datos : any;
  periodo : any;
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
  createdGrupos : Grupo[]
//crea un nuevo grupo 
  createGrupo(){
    this.createdGrupo.profesor = this.datos.nombre;
    this.createdGrupo.id_profesor = this.datos._id;
    this.createdGrupo.periodo = this.periodo;
    this.createdGrupo.lista_asistencia = [];
    this.createdGrupo.lista_estudiantes = [];
    this.createdGrupo.rubros = [];
    this.createdGrupo.curso = { codigo_programa: this.selectedPrograma.nombre ,codigo_curso: this.selectedCurso.codigo_curso, nombre: this.selectedCurso.nombre};
    this.createdGrupo.horario = this.horarios;
    this.grupoService.createGrupo(this.createdGrupo).then((data : Grupo)=>{ this.createdGrupos.push(data); })
  }
//modifica valores
  setSelectedGrupo(c: Grupo){
    this.createdGrupo = c;
    this.createdGrupo.cupos = c.cupos
    this.horarios = c.horario;
    this.selectedCurso.codigo_curso = c.curso.codigo_curso;
    this.selectedCurso.nombre = c.curso.nombre;
  }
//edita un grupo ya creado
  editGrupo(){
    this.createdGrupo.curso = { codigo_programa: this.selectedPrograma.codigo_programa , codigo_curso: this.selectedCurso.codigo_curso, nombre: this.selectedCurso.nombre};
    this.createdGrupo.horario = this.horarios;
    this.grupoService.updateGrupo(this.createdGrupo).then((data : Grupo) => { } )
  }
//elimina un grupo
  deleteGrupo(){
    this.grupoService.DeleteGrupo(this.createdGrupo._id).then((data: string)=> {this.actualizarGrupos();})

  }
//actualiza los grupos
  actualizarGrupos(){
    this.grupoService.getGruposByEscuela(this.datos.escuela).then((data : Grupo[]) => {this.createdGrupos = data; if(this.createdGrupos.length){this.conHorarios=true;}});
  }

  createForm() {
    this.form = this.formBuilder.group({
      dia: ['', Validators.required], 
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });}

  setPeriodo(){
    var today = new Date();
    this.periodo = {ano:"",semestre:""};
    if(today.getMonth() > 5){ this.periodo.semestre = "2"}else{ this.periodo.semestre = "1" };
    this.periodo.ano = today.getFullYear().toString();}
//borra el horario de un grupo seleccionado
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
    this.setPeriodo()
    this.selectedCurso = new Curso();
    this.selectedHorario = {dia:"",hora_inicio: "", hora_final:""};
    this.horarios = new Array();
    this.createdGrupos = new Array();
    this.conHorarios = false;
    this.datos = this.loginService.consultarDatos();
    this.createdGrupo =  new Grupo();
    this.createdGrupo.id_escuela = this.datos.escuela;
    this.createdGrupo.id_institucion = this.datos.institucion.nombre;
    this.createdGrupo.cupos = 0;
    this.createdGrupo.numero = 0;
    this.createdGrupo.sede = this.datos.institucion.sede;
    this.createdGrupo.periodo = {ano: "",semestre: ""};
    this.escuelaService.getEscuelasByID(this.datos.escuela).then((data: Escuela) => { 
      this.selectedEscuela = data;
      this.programas = data.programas;
    })
    this.actualizarGrupos();
    
   // this.grupoService.matricularGrupos(["5aa6e99cc8384722885c0c12,5aa7063e6320fb098c289641"],"5aa0f3f994172712c8bf041d").then((data: Grupo[]) => {} ) 
}
}