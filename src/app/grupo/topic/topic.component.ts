import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Topic } from '../../models/topic';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Comentario } from '../../models/comentario';
import { LoginService } from '../../login/login.service';
import { GrupoService } from '../grupo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GrupoBarComponent } from '../../navigation/grupo-bar/grupo-bar.component'

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers: [LoginService, GrupoService]
})
export class TopicComponent implements OnInit {

  topic: Topic;
  id_usuario: String;
  isTextEditable: boolean;
  editComments: boolean[];
  constructor(private dataService: DataService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private grupoService: GrupoService,
              private router: Router) { this.isTextEditable = false; 
              this.editComments = [];}

  ngOnInit() {
    this.route.params.subscribe(params => {
      var topic_id = params['id'];
      this.grupoService.getTopic(topic_id).then((topic: Topic) => {
        this.topic = topic;
        for(var i = 0; i< this.topic.comentarios.length; i++){
          this.editComments.push(false);
        }
      })
    });
    this.id_usuario = this.loginService.consultarDatos()._id;
   
  }

  crearComentario(form: NgForm){
    var comentario = new Comentario;
    var usuario = this.loginService.consultarDatos();
    comentario.autor = {
      id_usuario: usuario._id,
      nombre: usuario.nombre,
      tipo: usuario.tipo
    }
    comentario.fecha = new Date();
    comentario.texto = form.value.txt;
    var putTopic = this.topic;
    putTopic.comentarios.push(comentario);
    this.grupoService.putTopic(putTopic).then((topic: Topic) => {
      this.topic = topic;
      this.dataService.data = this.topic;
      this.editComments.push(false);
    });
  
  }

    
  changeTextEditable(text: String){
    if(this.isTextEditable){
      this.isTextEditable = false;
      var putTopic = this.topic;
      putTopic.texto = text;
      this.grupoService.putTopic(putTopic).then((topic: Topic) =>{
        this.topic = topic;
      })
    }
    else{
      this.isTextEditable = true;
     
    }
  }

  changeCommentEditable(i: number, text: String){
    if(this.editComments[i]){
      this.editComments[i] = false;
      var putTopic = this.topic;
      putTopic.comentarios[i].texto = text;
      this.grupoService.putTopic(putTopic).then((topic: Topic) =>{
        this.topic = topic;
      })
    }
    else{
      this.editComments[i] = true;
    }
  }

  deleteComment(comentario: any, i:number){
    var putTopic = this.topic;
    putTopic.comentarios.splice(putTopic.comentarios.indexOf(comentario),1);
    this.grupoService.putTopic(putTopic).then((topic: Topic) =>{
      this.topic = topic;
      console.log(i);
      this.editComments.splice(i,1);
    })
  }

  deleteTopic(){
    this.grupoService.deleteTopic(this.topic._id).then((id_topic: string) =>{
      this.router.navigate(['/grupo/foro']);
    })
    
  }

  abrirTopic(){
    var putTopic = this.topic;
    putTopic.estado = 'Abierto';
    this.grupoService.putTopic(putTopic).then((topic: Topic) =>{
      this.topic = topic;
    })
  }

  cerrarTopic(){
    var putTopic = this.topic;
    putTopic.estado = 'Cerrado';
    this.grupoService.putTopic(putTopic).then((topic: Topic) =>{
      this.topic = topic;
    })
  }


}
