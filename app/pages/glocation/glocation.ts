import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/glocation/glocation.html',
})
export class GlocationPage {
  _isAndroid: boolean;
  _isiOS: boolean;
  Location: string = '31.233611,121.4651457,16.08';
  constructor(private platform: Platform) {
    this._isAndroid = platform.is('android');
    this._isiOS = platform.is('ios');
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

  openMapsApp() {
    if (this._isiOS) {
      window.open(`http://maps.apple.com/?q=${Location}_system`);
      return;
    }
    if (this._isAndroid) {
      window.open('geo:' + Location);
      return;
    }
    window.open(`http://maps.google.com/?q=${Location}_system`);
    return;
  }
}
