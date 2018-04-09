import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ListaAsistencia } from '../../models/lista-asistencia'

@Injectable()
export class AsistenciaService {

  constructor(private http: Http) { }

  private GrupoUrl = 'api/asistencia'
//obtienen la asistencia de un grupo, los estudiantes matriculados y su estado, en una fecha indicada
  getAsistenciasGrupo(id_grupo: string): Promise<void | ListaAsistencia[]> {
    return this.http.get(this.GrupoUrl + '/' + id_grupo)
               .toPromise()
               .then(response => response.json() as ListaAsistencia[])
               .catch(this.handleError);
  }
//crea una asistencia nueva
  createAsistencia(lista: ListaAsistencia): Promise<void | ListaAsistencia> {
    return this.http.post(this.GrupoUrl, lista)
          .toPromise()
          .then(response => response.json() as ListaAsistencia)
          .catch(this.handleError);
  }
//actualiza un grupo con la nueva asistencia
  updateGrupo(putAsistencia: ListaAsistencia): Promise<void | ListaAsistencia> {
    var putUrl = this.GrupoUrl + '/' + putAsistencia._id;
    return this.http.put(putUrl, putAsistencia)
               .toPromise()
               .then(response => response.json() as ListaAsistencia)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

}
