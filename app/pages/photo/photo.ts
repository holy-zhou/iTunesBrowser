import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/photo/photo.html',
})
export class PhotoPage {

  base64Image: string;
  constructor(private navCtrl: NavController) {

  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imgData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imgData;
    }, (err) => {
      console.log(err);
    });
  }

}
