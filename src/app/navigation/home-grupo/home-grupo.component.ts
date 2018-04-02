import { Component, OnInit } from '@angular/core';
import { Escuela } from '../../escuela/escuela';
import { EscuelaService } from '../../escuela/escuela.service';
import { evaluaciones } from '../../evaluaciones/evaluaciones';
import { EvaluacionesService } from '../../evaluaciones/evaluaciones.service';
import { Grupo } from '../../grupo/grupo';
import { GrupoService } from '../../grupo/grupo.service';

@Component({
  selector: 'app-home-grupo',
  templateUrl: './home-grupo.component.html',
  styleUrls: ['./home-grupo.component.css'],
  providers : [EscuelaService]
})
export class HomeGrupoComponent implements OnInit {

  escuela : Escuela;
  grupo : Grupo;
  temas : any[]

  constructor(private escuelaService : EscuelaService, private grupoService : GrupoService) { }

  rellenarListaTemas(){
  }

  ngOnInit() {
    this.grupoService.getGrupo("5abff382d1058d1754c806fc").then((data : Grupo)=>{
      this.grupo = data;
      this.escuelaService.getEscuelasByID(this.grupo.id_escuela).then((escuela:Escuela)=>{
        this.escuela = escuela;
      })
    })
  }

}
