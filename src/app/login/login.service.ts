import { Injectable } from '@angular/core';
import { LoginComponent } from './login.component';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor( private http: Http ) { }

  login(user): Promise<void | any> {
    return this.http.get('/login/'+user.username+'/'+user.password).toPromise().then(response => response.json() as any ).catch(this.handleError);
  }

  guardarDatos(usuario){
    localStorage.setItem('id', usuario.id);
    localStorage.setItem('nombre', usuario.nombre);
    localStorage.setItem('permiso', usuario.permiso);
    localStorage.setItem('institucion', usuario.institucion.nombre);
    localStorage.setItem('sede', usuario.institucion.sede);
    localStorage.setItem('escuela', usuario.escuela);
  }

  consultarDatos(){
    var datos = {
      id : localStorage.getItem('id'),
      nombre: localStorage.getItem('nombre'),
      institucion: localStorage.getItem('institucion'),
      sede : localStorage.getItem('sede'),
      escuela: localStorage.getItem('escuela'),
      permiso: localStorage.getItem('permiso')
    }
    return datos;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

}
