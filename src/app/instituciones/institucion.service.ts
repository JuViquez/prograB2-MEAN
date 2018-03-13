import { Injectable } from '@angular/core';
import { Institucion } from './institucion';
import { Http, Response } from '@angular/http';

@Injectable()
export class InstitucionService {

  private InstitucionUrl = 'api/instituciones'

  constructor(private http: Http) { }

  getInstituciones(): Promise<void | Institucion[]> {
    return this.http.get(this.InstitucionUrl)
               .toPromise()
               .then(response => response.json() as Institucion[])
               .catch(this.handleError);
  }

  getInstitucionById(_id: string){
    return this.http.get(this.InstitucionUrl + '/' + _id)
    .toPromise()
    .then(response => response.json() as Institucion)
    .catch(this.handleError);
  }


  createInstitucion(newInstitucion: Institucion): Promise<void | Institucion> {
    return this.http.post(this.InstitucionUrl, newInstitucion)
          .toPromise()
          .then(response => response.json() as Institucion)
          .catch(this.handleError);
  }

  updateInstitucion(putInstitucion: Institucion): Promise<void | Institucion> {
    var putUrl = this.InstitucionUrl + '/' + putInstitucion._id;
    return this.http.put(putUrl, putInstitucion)
               .toPromise()
               .then(response => response.json() as Institucion)
               .catch(this.handleError);
  }

  DeleteInstitucion(delInstitucionId: string): Promise<void | string> {
    var delUrl = this.InstitucionUrl + '/' + delInstitucionId;
    return this.http.delete(delUrl)
               .toPromise()
               .then(response => response.json() as string)
               .catch(this.handleError);
  }


  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
