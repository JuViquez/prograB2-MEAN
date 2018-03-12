import { Injectable } from '@angular/core';
import { LoginComponent } from './login.component';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from '../usuario/usuario';

@Injectable()
export class LoginService {

  constructor( private http: Http ) { }

  login(user): Promise<void | any> {
    return this.http.get('/login/'+user.username+'/'+user.password).toPromise()
    .then(response => response.json() as Usuario ).catch(this.handleError);
  }

  guardarDatos(usuario: Usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logOut(){
    console.log("LOGOUT");
    localStorage.clear();
  }

  consultarDatos(){
    return JSON.parse(localStorage.getItem('usuario')) as Usuario ;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

}
