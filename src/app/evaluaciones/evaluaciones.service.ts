import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { evaluaciones } from '../evaluaciones/evaluaciones'

@Injectable()
export class EvaluacionesService {

  private EvaluacionesUrl = 'api/evaluaciones'

  constructor(private http: Http) { }

  createEvaluaciones(evaluacion: evaluaciones): Promise<void | evaluaciones> {
    return this.http.post(this.EvaluacionesUrl, evaluacion)
          .toPromise()
          .then(response => response.json() as evaluaciones)
          .catch(this.handleError);
  }

  getEvaluaciones(id_grupo : string): Promise<void | evaluaciones[]> {
    return this.http.get(this.EvaluacionesUrl+'/'+id_grupo)
               .toPromise()
               .then(response => response.json() as evaluaciones[])
               .catch(this.handleError);
  }

  updateEvaluaciones(putEvaluaciones : evaluaciones): Promise<void | evaluaciones> {
    var putUrl = this.EvaluacionesUrl + '/' + putEvaluaciones._id;
    return this.http.put(putUrl, putEvaluaciones)
               .toPromise()
               .then(response => response.json() as evaluaciones)
               .catch(this.handleError);
  }

  deleteEvaluacion(delId: string): Promise<void | string> {
    var delUrl = this.EvaluacionesUrl + '/' + delId;
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
