import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../navigation/navigation-bar/navigation-bar.component'
import { Usuario } from '../usuario';
import { Mensaje } from '../../models/mensaje';
import { MensajeService } from '../../services/mensaje.service';
import { UsuarioService } from '../usuario.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-mis-mensajes',
  templateUrl: './mis-mensajes.component.html',
  styleUrls: ['./mis-mensajes.component.css'],
  providers: [MensajeService, UsuarioService, LoginService]
})
export class MisMensajesComponent implements OnInit {

  contactos: Usuario[];
  currentUserId: String;
  currentReceiver: Usuario;

  chat: Mensaje[];
  
  constructor(private mensajeService: MensajeService,
              private usuarioService: UsuarioService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.currentUserId = this.loginService.consultarDatos()._id;
    this.usuarioService.getUsuarios().then((usuarios: Usuario[])=>{
      this.contactos = usuarios;
    })
  }

  contactoSelected(receiver: Usuario){
    this.currentReceiver = receiver;
    this.mensajeService.getChat(this.currentUserId, receiver._id).then((msgs: Mensaje[])=>{
      this.chat = msgs;
    })

  }

  sendMsg(msg: String){
    var newMsg = new Mensaje();
    newMsg.fecha = new Date();
    newMsg.id_destinatario = this.currentReceiver._id;
    newMsg.id_usuario = this.currentUserId;
    newMsg.mensaje = msg;
    this.mensajeService.postMensaje(newMsg).then((msg: Mensaje)=>{
      this.chat.push(msg);
    })
  }

  refresh(){
    this.mensajeService.getChat(this.currentUserId, this.currentReceiver._id).then((msgs: Mensaje[])=>{
      this.chat = msgs;
    })
  }

}
