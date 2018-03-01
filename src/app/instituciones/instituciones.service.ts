import { Injectable } from '@angular/core';
import { Institucion } from './institucion';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InstitucionesService {

  private institucionesUrl = '/api/instituciones';

  constructor(private http: Http) {}

  getUsers(): Promise<void | Institucion[]> {
    console.log("promesa");
    return this.http.get(this.institucionesUrl)
               .toPromise()
               .then(response => response.json() as Institucion[])
               .catch(this.handleError);
  
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); 
  }

  }


