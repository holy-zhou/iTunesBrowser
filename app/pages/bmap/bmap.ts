import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BaiduMap} from 'angular2-baidu-map';
import {Geolocation} from 'ionic-native';

declare var BMap;

@Component({
  templateUrl: 'build/pages/bmap/bmap.html',
  directives: [BaiduMap]
})
export class BmapPage {
  opts: any = {
    center: {
      longitude: 121.4651457,
      latitude: 31.233611
    },
    zoom: 17
  };
  constructor(private navCtrl: NavController) {
  }

  ionViewLoaded() {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then((pos) => {
        this.opts = {
          center: {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          },
          zoom: 17
        };
      }).catch((err) => {
        console.log(err);
      });
  }

  loadMap(e: any) {
    console.log(e); // e here is the instance of BMap.Map
  }

  clickMarker(marker: any) {
    console.log('The clicked marker is', marker);
  }

}
