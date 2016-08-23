import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BaiduMap, OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map';

declare var BMap;

@Component({
  templateUrl: 'build/pages/bmap/bmap.html',
  directives: [BaiduMap]
})
export class BmapPage {
  opts: any;
  constructor(private navCtrl: NavController) {
  }

  ionViewLoaded() {
    this.opts = {
      center: {
        longitude: 121.506191,
        latitude: 31.245554
      },
      zoom: 17
    };
  }

  loadMap(e: any) {
    console.log(e); // e here is the instance of BMap.Map
  }

  clickMarker(marker: any) {
    console.log('The clicked marker is', marker);
  }

}
