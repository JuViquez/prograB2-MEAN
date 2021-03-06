import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Institucion } from '../institucion';
import { InstitucionService } from '../institucion.service';
import { EscuelaService } from '../../escuela/escuela.service';
import { Escuela } from '../../escuela/escuela';
import {UsuarioService} from '../../usuario/usuario.service'
import {Usuario} from '../../usuario/usuario'
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component' 


@Component({
  selector: 'app-instituciones-list',
  templateUrl: './instituciones-list.component.html',
  styleUrls: ['./instituciones-list.component.css'],
  providers: [UsuarioService,InstitucionService,EscuelaService]
})
export class InstitucionesListComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Input() barra : Boolean;
  creador: Boolean;
  instituciones: Institucion[];
  selectedInstitucion: Institucion;
  noInstitucion: Boolean;
  inputInstitucion: string;
  sedes: any[];
  selectedSede: any;
  noSede: Boolean;
  inputSede: string;
  escuelas: any[];
  selectedEscuela: Escuela;
  noEscuela: Boolean;
  inputEscuela: string;
  periodo: any;

  selectInstitucion (event: any){
    this.sedes = [];
    this.escuelas = [];
    if(typeof(this.selectedInstitucion.nombre) == 'undefined'){
      //No encuentra Institución, se habilita la opción de crear una
      this.noInstitucion = true;
      this.noSede=true;
      this.noEscuela = true;
    }else{
      console.log(this.selectedInstitucion.sedes.length);
      this.sedes = this.selectedInstitucion.sedes;
      this.noInstitucion = false;
      this.noSede = false;
      this.noEscuela = false;
    }
  }
  
  selectSede(event: any){
    this.escuelas = [];
    //this.selectedSede = event.target.value;
    if(typeof(this.selectedSede.nombre) == 'undefined'){
      //No se encuentra sede, se habilita la opción de crear nueva
      this.noSede = true;  
      this.noEscuela = true;   
    }
    else{
      this.noSede = false;
      this.noEscuela = false;
      this.getNombreEscuelas(this.selectedSede.id_escuelas);
    }
  }

  selectEscuela(event: any){
    if(typeof(this.selectedEscuela.nombre) == 'undefined'){
      //No se encuentra escuela, se habilita la opción de crear nueva
      this.noEscuela = true;     
    }
    else{
      this.noEscuela = false;
    }
  }

  setPeriodo(){
    var today = new Date();
    this.periodo = {ano:"",semestre:""};
    console.log(today);
    if(today.getMonth() > 5){ this.periodo.semestre = "2"}else{ this.periodo.semestre = "1" };
    this.periodo.ano = today.getFullYear().toString();
    console.log(this.periodo.ano);
  }
//obtiene todas las escuelas creadas
  getNombreEscuelas(arreglo: string[]){
    this.escuelasService.getEscuelas(arreglo).then((data:Escuela[]) => { 
      this.escuelas = data; console.log("arreglo: "+this.escuelas[0].nombre);})}
//envia el documento a la base 
  EnviarDocumento(){
    var InstitucionOutput = new Institucion;
    var escuelaCreada: Escuela;
    var institucionCreada: {nombre:string,sede:string,escuela:string};
    institucionCreada = {nombre:"",sede:"",escuela:""};
    escuelaCreada = {nombre: this.inputEscuela, programas: [{codigo_programa:"",nombre:"",malla_curricular:[{codigo_curso:"",nombre:"",temas:[{nombre:"",subtemas:[]}]}]}]};
    if(this.noInstitucion && this.creador){
      InstitucionOutput.nombre = this.inputInstitucion;
      this.escuelasService.createEscuela(escuelaCreada).then((data: Escuela) => {escuelaCreada = data;
        InstitucionOutput.sedes = [{nombre:this.inputSede,id_escuelas:[escuelaCreada._id]}];
        InstitucionOutput.periodo = this.periodo;
        this.institucionService.createInstitucion(InstitucionOutput).then((data2: Institucion) => {institucionCreada.nombre = data2._id; institucionCreada.sede = this.inputSede; institucionCreada.escuela = escuelaCreada._id; this.notify.emit(institucionCreada); })
      } )
    }else if(this.noSede && this.creador){
      this.escuelasService.createEscuela(escuelaCreada).then((data: Escuela) => {escuelaCreada = data;
        this.selectedInstitucion.sedes.push({nombre:this.inputSede,id_escuelas:[escuelaCreada._id]});  
        this.institucionService.updateInstitucion(this.selectedInstitucion).then((data2: Institucion) => { institucionCreada.nombre = this.selectedInstitucion._id; institucionCreada.sede = this.inputSede; institucionCreada.escuela = escuelaCreada._id; this.notify.emit(institucionCreada); } )
      } )
    }else if(this.noEscuela && this.creador){
      this.escuelasService.createEscuela(escuelaCreada).then((data: Escuela) => {escuelaCreada = data;

        this.selectedSede.id_escuelas.push(escuelaCreada._id);
          var index = this.selectedInstitucion.sedes.indexOf(this.selectedSede);
          if (index !== -1) {this.selectedInstitucion.sedes.splice(index, 1); this.selectedInstitucion.sedes.push({nombre:this.selectedSede.nombre,id_escuelas:this.selectedSede.id_escuelas}); };
        this.institucionService.updateInstitucion(this.selectedInstitucion).then((data2: Institucion) => { institucionCreada.nombre = this.selectedInstitucion._id; institucionCreada.sede = this.selectedSede.nombre; institucionCreada.escuela = escuelaCreada._id; this.notify.emit(institucionCreada);
      })})
    }else{
      try{
        institucionCreada.nombre = this.selectedInstitucion._id; institucionCreada.sede = this.selectedSede.nombre; institucionCreada.escuela = this.selectedEscuela._id; this.notify.emit(institucionCreada);
      }catch(err){
        console.log("error")
      }
      }
  };


  constructor(private usuarioService : UsuarioService,private institucionService: InstitucionService,private escuelasService: EscuelaService) {}

  ngOnInit() {
    this.creador = true;
    this.selectedEscuela = null;
    this.sedes = new Array();
    this.noInstitucion = false;
    this.noSede = false;
    this.noEscuela = false;
    this.institucionService.getInstituciones().then((data: Institucion[]) => { 
      this.instituciones = data;
    });
    this.setPeriodo();
  }
}