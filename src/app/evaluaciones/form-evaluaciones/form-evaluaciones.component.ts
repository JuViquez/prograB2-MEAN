import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { evaluaciones } from '../evaluaciones'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EvaluacionesService } from '../evaluaciones.service'

@Component({
  selector: 'app-form-evaluaciones',
  templateUrl: './form-evaluaciones.component.html',
  styleUrls: ['./form-evaluaciones.component.css'],
  providers: [EvaluacionesService]
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

  actualizarListaEvaluaciones(){
    this.evaluacionesService.getEvaluaciones().then((data: evaluaciones[]) => {
      this.listaEvaluaciones = data;
    } )
  }

  submitEliminar(){
    this.evaluacionesService.deleteEvaluacion(this.selectedEvaluacion._id).then((data:string)=>{this.actualizarListaEvaluaciones()})
  }

  submitModificar(){
    this.evaluacionesService.updateEvaluaciones(this.selectedEvaluacion).then((data : evaluaciones)=>{this.actualizarListaEvaluaciones()});
  }

  submitAgregar(){
    this.selectedEvaluacion.id_grupo = "5aa7526784df143ac06a0105";
    this.evaluacionesService.createEvaluaciones(this.selectedEvaluacion).then((data: evaluaciones)=>{ this.actualizarListaEvaluaciones() })
  }

  constructor(private formBuilder: FormBuilder, private evaluacionesService : EvaluacionesService) {  this.createForm();}

  ngOnInit() {
    this.selectedEvaluacion = new evaluaciones();
    this.actualizarListaEvaluaciones();
  }

}
