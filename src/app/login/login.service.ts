import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor( private http: Http ) { }

  login(user) {
    return this.http.post('/login', user).map(res => res.json());
  }
}
