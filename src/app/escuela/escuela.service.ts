import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Escuela } from './escuela';

@Injectable()
export class EscuelaService {

  private EscuelaUrl = 'api/escuelas'
  
    constructor(private http: Http) { }
  
    getEscuelas(escuelasIds: string[]): Promise<void | Escuela[]> {
      return this.http.get(this.EscuelaUrl, {params: escuelasIds})
                 .toPromise()
                 .then(response => response.json() as Escuela[])
                 .catch(this.handleError);
    }
  
  
    createEscuela(newEscuela: Escuela): Promise<void | Escuela> {
      return this.http.post(this.EscuelaUrl, newEscuela)
            .toPromise()
            .then(response => response.json() as Escuela)
            .catch(this.handleError);
    }
  
    updateEscuela(putEscuela: Escuela): Promise<void | Escuela> {
      var putUrl = this.EscuelaUrl + '/' + putEscuela._id;
      return this.http.put(putUrl, putEscuela)
                 .toPromise()
                 .then(response => response.json() as Escuela)
                 .catch(this.handleError);
    }
  
    DeleteEscuela(delEscuelaId: string): Promise<void | string> {
      var delUrl = this.EscuelaUrl + '/' + delEscuelaId;
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
