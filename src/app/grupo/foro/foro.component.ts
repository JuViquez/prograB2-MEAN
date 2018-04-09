import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { Topic } from '../../models/topic';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { LoginService } from '../../login/login.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { GrupoBarComponent } from '../../navigation/grupo-bar/grupo-bar.component'

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
  providers: [GrupoService, LoginService]
})
export class ForoComponent implements OnInit {

  topics: Topic[]; //arreglo de todos los temas de foros

  constructor(private grupoService: GrupoService, 
              private loginService: LoginService,
              private dataService: DataService,
            ) { }

  ngOnInit() {
    this.grupoService.getForumTopics( this.loginService.consultarGrupo()._id).then((topics: Topic[])=>{
       this.topics = topics;
    });
  }
//crea un nuevo tema en los foros
  crearTopic(form: NgForm){
    var user = this.loginService.consultarDatos();
    var newTopic = new Topic();
    newTopic.autor = {id_usuario: "", nombre: "", tipo: ""};
    newTopic.autor.nombre = user.nombre;
    newTopic.autor.id_usuario = user._id;
    newTopic.autor.tipo = user.tipo;
    newTopic.comentarios = [];
    newTopic.estado = 'Abierto';
    newTopic.fecha = new Date();
    newTopic.id_grupo = this.loginService.consultarGrupo()._id;
    newTopic.texto = form.value.txt;
    newTopic.titulo = form.value.titulo;

    this.grupoService.postTopic(newTopic).then((topic: Topic) => {
      this.topics.push(topic);
    });
  }

}
