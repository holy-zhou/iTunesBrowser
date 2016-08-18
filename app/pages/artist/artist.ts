import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Itunes} from '../../providers/itunes/itunes';

@Component({
  templateUrl: 'build/pages/artist/artist.html',
  providers: [Itunes]
})
export class ArtistPage {
  artist: any;
  albums: any;

  constructor(private navCtrl: NavController, private itunes: Itunes, params: NavParams) {
    this.artist = params.data;
    itunes.loadAlbums(params.data.id)
      .then(albums => this.albums = albums);
  }

}
