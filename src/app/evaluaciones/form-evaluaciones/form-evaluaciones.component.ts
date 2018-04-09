import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { evaluaciones } from '../evaluaciones'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EvaluacionesService } from '../evaluaciones.service';
import { GrupoService } from '../../grupo/grupo.service'
import { Grupo } from '../../grupo/grupo';
import { ListaEstudiantes } from '../../models/lista-estudiantes';
import { GrupoBarComponent } from '../../navigation/grupo-bar/grupo-bar.component';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-form-evaluaciones',
  templateUrl: './form-evaluaciones.component.html',
  styleUrls: ['./form-evaluaciones.component.css'],
  providers: [EvaluacionesService,GrupoService,LoginService]
})

export class FormEvaluacionesComponent implements OnInit {
  selectedEvaluacion: evaluaciones; 
  listaEvaluaciones : evaluaciones[];
  form: FormGroup;

  //se inicializa el formulario, este método se invoca en el constructor.
  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required], 
      fecha: ['', Validators.required],
      porcentaje: ['', Validators.required],
      tipo: ['', Validators.required]
    });}

  setSelectedEvaluacion(e:evaluaciones){
    this.selectedEvaluacion = e;
  }
//actualiza la lista de evaluaciones
  actualizarListaEvaluaciones(){
    this.evaluacionesService.getEvaluaciones(this.selectedEvaluacion._id).then((data: evaluaciones[]) => {
      this.listaEvaluaciones = data;
    } )
  }

  submitEliminar(){
    var idEvaluacion = this.selectedEvaluacion._id;
    this.evaluacionesService.deleteEvaluacion(this.selectedEvaluacion._id).then((data:string)=>{
      this.grupoService.getGrupo(this.selectedEvaluacion.id_grupo).then((grupo:Grupo)=>{
        for(var e in grupo.lista_estudiantes){
          for(var i = 0; i < grupo.lista_estudiantes[e].evaluaciones.length; i++){
            if(grupo.lista_estudiantes[e].evaluaciones[i].id_evaluacion==idEvaluacion){
              grupo.lista_estudiantes[e].evaluaciones.splice(i,1);
              break;
            }
          }
        }
        this.grupoService.updateGrupo(grupo).then((resultado:Grupo)=>{});
      })
      this.actualizarListaEvaluaciones()})
  }
//modifica la lista de evaluaciones
  submitModificar(){
    this.evaluacionesService.updateEvaluaciones(this.selectedEvaluacion).then((data : evaluaciones)=>{
      this.grupoService.getGrupo(this.selectedEvaluacion.id_grupo).then((grupo:Grupo)=>{
        var evalEst;
        for(var e in grupo.lista_estudiantes){
          evalEst = grupo.lista_estudiantes[e].evaluaciones.find(x => x.id_evaluacion == data._id);
          evalEst.porcentaje = data.porcentaje;
        }
        this.grupoService.updateGrupo(grupo).then((resultado:Grupo)=>{})
      });
      this.actualizarListaEvaluaciones()});
  }

  submitAgregar(){
    this.selectedEvaluacion.id_grupo = this.loginService.consultarGrupo()._id;
    this.evaluacionesService.createEvaluaciones(this.selectedEvaluacion).then((data: evaluaciones)=>{ this.actualizarListaEvaluaciones();
      this.grupoService.getGrupo(this.selectedEvaluacion.id_grupo).then((grupo:Grupo)=>{
        for(var e in grupo.lista_estudiantes){ grupo.lista_estudiantes[e].evaluaciones.push({id_evaluacion:data._id,porcentaje:data.porcentaje,nota:0})}
        this.grupoService.updateGrupo(grupo).then((resultado:Grupo)=>{})
      })
    })
  }

  constructor(private loginService : LoginService, private formBuilder: FormBuilder, private grupoService : GrupoService, private evaluacionesService : EvaluacionesService) {  this.createForm();}

  ngOnInit() {
    this.selectedEvaluacion = new evaluaciones();
    this.actualizarListaEvaluaciones();
  }

}
