import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Itunes {

  data: any;
  constructor(private http: Http) {
    this.data = null;
  }

  search(keyword) {
    return this.http.get('data/itunes.json')
      .map(res => res.json())
      .toPromise()
      .then((data) => data.results);
  }

  loadAlbums(id) {

    return this.http.get(`https://itunes.apple.com/lookup?id=${id}&entity=album`)

      .map(res => res.json())
      .toPromise()
      .then((data) => data.results)
      .then((results) => results.filter((item) => item.collectionType === 'Album'));
  }
}

