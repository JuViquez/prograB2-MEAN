import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { Topic } from '../../models/topic';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { LoginService } from '../../login/login.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
  providers: [GrupoService, LoginService]
})
export class ForoComponent implements OnInit {

  topics: Topic[];

  constructor(private grupoService: GrupoService, 
              private loginService: LoginService,
              private dataService: DataService) { }

  ngOnInit() {
    this.grupoService.getForumTopics( "5aa7526784df143ac06a0105").then((topics: Topic[])=>{
       this.topics = topics;
    });
  }

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
    newTopic.id_grupo = "5aa7526784df143ac06a0105";
    newTopic.texto = form.value.txt;
    newTopic.titulo = form.value.titulo;

    this.grupoService.postTopic(newTopic).then((topic: Topic) => {
      this.topics.push(topic);
    });
  }

}
