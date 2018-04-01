import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Http } from '@angular/http';

@Injectable()
export class UsuarioService {

  private UsuarioUrl = 'api/usuarios'
  
    constructor(private http: Http) { }
  
    getUsuarios(): Promise<void | Usuario[]> {
      return this.http.get(this.UsuarioUrl)
                 .toPromise()
                 .then(response => response.json() as Usuario[])
                 .catch(this.handleError);
    }
  
    getUsuario(id_usuarios: string): Promise<void | Usuario> {
      return this.http.get(this.UsuarioUrl+"/"+id_usuarios)
                 .toPromise()
                 .then(response => response.json() as Usuario)
                 .catch(this.handleError);
    }
  
    createUsuario(newUsuario: Usuario): Promise<void | Usuario> {
      return this.http.post(this.UsuarioUrl, newUsuario)
            .toPromise()
            .then(response => response.json() as Usuario)
            .catch(this.handleError);
    }
  
    updateUsuario(putUsuario: Usuario): Promise<void | Usuario> {
      var putUrl = this.UsuarioUrl + '/' + putUsuario._id;
      return this.http.put(putUrl, putUsuario)
                 .toPromise()
                 .then(response => response.json() as Usuario)
                 .catch(this.handleError);
    }
  
    DeleteUsuario(delUsuarioId: string): Promise<void | string> {
      var delUrl = this.UsuarioUrl + '/' + delUsuarioId;
      return this.http.delete(delUrl)
                 .toPromise()
                 .then(response => response.json() as string)
                 .catch(this.handleError);
    }
  
    updateNotaFinal(idUsuario : string, idGrupo: string, notaFinal: number, estatus: string): Promise<void | Usuario> {
      var putUrl = this.UsuarioUrl + '/nota/' + idUsuario + '/' + idGrupo
      return this.http.put(putUrl, {nota: notaFinal, estatus: estatus})
                 .toPromise()
                 .then(response => response.json() as Usuario)
                 .catch(this.handleError);
    }

    getEscuelas3(): Promise<void | any> {
      return this.http.get(this.UsuarioUrl+'/agg')
                 .toPromise()
                 .then(response => response.json() as any)
                 .catch(this.handleError);
    }
    
    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
    }

}
