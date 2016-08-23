import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from 'ionic-native';
/*
  Generated class for the GlocationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/glocation/glocation.html',
})
export class GlocationPage {
  Location: string;
  constructor(private navCtrl: NavController) {

  }
  getLocation() {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        this.Location = `${lat},${lon}`;
      }).catch((err) => {
        console.log(err);
      });
  }
}
