import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundGeolocation } from 'ionic-native';

/*
  Generated class for the BglocationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/bglocation/bglocation.html',
})
export class BglocationPage {
  Location: string = '31.233611,121.4651457,16.08';
  constructor(private navCtrl: NavController) {

  }
  start() {
    let config = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    BackgroundGeolocation.configure(config)
      .then((location) => {
        // console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
        let lat = location.latitude;
        let lon = location.longitude;
        this.Location = `${lat},${lon}`;
        BackgroundGeolocation.stop();
        // BackgroundGeolocation.finish(); // FOR IOS ONLY
      }, (error) => {
        console.log('BackgroundGeolocation error');
      });

    BackgroundGeolocation.start();
  }

}
