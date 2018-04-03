import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../grupo/grupo';
import { GrupoService } from '../../grupo/grupo.service';
import { evaluaciones } from '../evaluaciones';
import { EvaluacionesService } from '../evaluaciones.service';
import { Usuario } from '../../usuario/usuario';
import { UsuarioService } from '../../usuario/usuario.service'
import { GrupoBarComponent } from '../../navigation/grupo-bar/grupo-bar.component';
import { LoginService } from '../../login/login.service'


@Component({
  selector: 'app-tabla-calificaciones',
  templateUrl: './tabla-calificaciones.component.html',
  styleUrls: ['./tabla-calificaciones.component.css'],
  providers : [GrupoService,EvaluacionesService,UsuarioService,LoginService]
})
export class TablaCalificacionesComponent implements OnInit {

  listaEvaluaciones : evaluaciones[];
  grupo : Grupo;
  filas : any[];
  available : Boolean;

  rellenarTabla(){
    var calificaciones : number[];
    var calificacion;
    var nota : number;
    for(var e in this.grupo.lista_estudiantes){
      calificaciones = [];
      for(var a in this.grupo.lista_estudiantes[e].evaluaciones){
        calificacion = (this.grupo.lista_estudiantes[e].evaluaciones[a].nota/100)*this.grupo.lista_estudiantes[e].evaluaciones[a].porcentaje;
        calificaciones.push(calificacion);
      }
      nota = calificaciones.reduce(function(a, b) { return a + b; }, 0);
      this.filas.push({id_estudiante:this.grupo.lista_estudiantes[e].id_estudiante,nombre:this.grupo.lista_estudiantes[e].nombre,calificaciones:calificaciones,nota:nota})
    }
    this.available = true;
  }

  generarNotaFinal(){
    this.available = false;
    var estatus;
    for(var e in this.filas){
      if(this.filas[e].nota >= 67.5){
        estatus = "Aprobado";
      }else{
        estatus = "Reprobado"
      }
      this.usuarioService.updateNotaFinal(this.filas[e].id_estudiante,this.grupo._id,this.filas[e].nota,estatus).then((data:Usuario)=>{})
    }
    this.available = true;
  }

  constructor(private loginService : LoginService, private usuarioService: UsuarioService, private grupoService : GrupoService, private evaluacionesService : EvaluacionesService) { }

  ngOnInit() {
    this.grupoService.getGrupo(this.loginService.consultarGrupo()._id).then((data:Grupo)=>{
      this.grupo = data;
      this.evaluacionesService.getEvaluaciones(this.grupo._id).then((data2:evaluaciones[])=>{
        this.available = false;
        this.listaEvaluaciones = data2;
        this.filas = [];
        this.rellenarTabla();
      })
    })
  }

}
