import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Grupo } from './grupo';

@Injectable()
export class GrupoService {

  constructor(private http: Http) { }
  
   private GrupoUrl = 'api/grupos'

    getGruposByEscuela(id_escuela: string): Promise<void | Grupo[]> {
      return this.http.get(this.GrupoUrl + '/escuela/' + id_escuela)
                 .toPromise()
                 .then(response => response.json() as Grupo[])
                 .catch(this.handleError);
    }
  
    getGruposNoCursados(arreglo : string[], periodo : any ): Promise<void | Grupo[]>{

      return this.http.get(this.GrupoUrl + '/cursos/'+periodo.ano+'/'+periodo.semestre, {params:  arreglo}).
                  toPromise()
                  .then(response => response.json() as Grupo[])
                  .catch(this.handleError);
    }
  
    createGrupo(newGrupo: Grupo): Promise<void | Grupo> {
      return this.http.post(this.GrupoUrl, newGrupo)
            .toPromise()
            .then(response => response.json() as Grupo)
            .catch(this.handleError);
    }
  
    updateGrupo(putGrupo: Grupo): Promise<void | Grupo> {
      var putUrl = this.GrupoUrl + '/' + putGrupo._id;
      return this.http.put(putUrl, putGrupo)
                 .toPromise()
                 .then(response => response.json() as Grupo)
                 .catch(this.handleError);
    }

    matricularGrupos(arr : string [], idEstudiante : string) :Promise<void | Grupo[]> {
      var putUrl = this.GrupoUrl + '/matricula/' + idEstudiante;
      return this.http.put(putUrl, {arreglo: arr})
                 .toPromise()
                 .then(response => response.json() as Grupo[])
                 .catch(this.handleError);
    }
  
    DeleteGrupo(delGrupoId: string): Promise<void | string> {
      var delUrl = this.GrupoUrl + '/' + delGrupoId;
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
