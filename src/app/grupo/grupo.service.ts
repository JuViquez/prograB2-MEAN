import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Grupo } from './grupo';
import { Topic } from '../models/topic';

@Injectable()
export class GrupoService {

  constructor(private http: Http) { }
  
   private GrupoUrl = 'api/grupos'

   getGrupo(id_grupo: string): Promise<void | Grupo> {
    return this.http.get(this.GrupoUrl + '/' + id_grupo)
               .toPromise()
               .then(response => response.json() as Grupo)
               .catch(this.handleError);
  }

    getGruposByEscuela(id_escuela: string): Promise<void | Grupo[]> {
      return this.http.get(this.GrupoUrl + '/escuela/' + id_escuela)
                 .toPromise()
                 .then(response => response.json() as Grupo[])
                 .catch(this.handleError);
    }
  
    getGruposNoCursados(arreglo : string[], periodo : any, codigo_programa : string ): Promise<void | Grupo[]>{

      return this.http.get(this.GrupoUrl + '/cursos/'+periodo.ano+'/'+periodo.semestre+'/'+codigo_programa, {params:  arreglo}).
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

    updateManyGrupos(putGrupos: Grupo[]){
      var putUrl = this.GrupoUrl + '/update/many';
      return this.http.put(putUrl, { array: JSON.stringify(putGrupos)})
      .toPromise()
      .then(response => response.json() as Grupo[])
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

    getForumTopics(grupoId: string): Promise<void | Topic[]> {
      var url = this.GrupoUrl + '/topics/' + grupoId;
      return this.http.get(url)
                 .toPromise()
                 .then(response => response.json() as Topic[])
                 .catch(this.handleError);
    }
    

    postTopic(newTopic: Topic): Promise<void | Topic> {
      return this.http.post(this.GrupoUrl + '/topics', newTopic)
            .toPromise()
            .then(response => response.json() as Topic)
            .catch(this.handleError);
    }

    putTopic(putTopic: Topic){
      var putUrl = this.GrupoUrl + '/topics/' + putTopic._id;
      return this.http.put(putUrl, putTopic)
                 .toPromise()
                 .then(response => response.json() as Topic)
                 .catch(this.handleError);
    }
    
    getTopic(topic_id: String){
      var getUrl = this.GrupoUrl + '/topic/' + topic_id;
      return this.http.get(getUrl)
                 .toPromise()
                 .then(response => response.json() as Topic)
                 .catch(this.handleError);
    }

    deleteTopic(topic_id: String){
      var delUrl = this.GrupoUrl + '/topic/' + topic_id;
      return this.http.delete(delUrl)
                 .toPromise()
                 .then(response => response.json() as string)
                 .catch(this.handleError);
    }
    
  
    pushEvaluacion(evaluacion: JSON, id_grupo : string): Promise<void | JSON> {
      var putUrl = this.GrupoUrl + '/evaluacion/'+id_grupo;
      return this.http.put(putUrl, evaluacion)
                 .toPromise()
                 .then(response => response.json() as JSON)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
    }
}
