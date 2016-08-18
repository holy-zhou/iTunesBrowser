import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the Itunes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Itunes {

  data: any;
  constructor(private http: Http) {
    this.data = null;
  }

  search(keyword) {
    return this.http.request('data/itunes.json')
      .map(res => res.json())
      .toPromise()
      .then((data) => data.results);
  }
}

