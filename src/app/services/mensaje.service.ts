import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Mensaje } from '../models/mensaje';

@Injectable()
//modelo para el manejo de los mensajes
export class MensajeService {

  constructor(private http: Http) { }

  private mensajesUrl = 'api/mensajes'
//obtener el chat 
  getChat(id_usuario: String, id_destinatario: String): Promise<void | Mensaje[]> {
    return this.http.get(this.mensajesUrl + '/' + id_usuario + '/' + id_destinatario)
               .toPromise()
               .then(response => response.json() as Mensaje[])
               .catch(this.handleError);
  }
//postear un mensaje
  postMensaje(newMensaje: Mensaje): Promise<void | Mensaje> {
    return this.http.post(this.mensajesUrl, newMensaje)
          .toPromise()
          .then(response => response.json() as Mensaje)
          .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

}
