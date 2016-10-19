import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from 'ionic-native';



@Component({
  templateUrl: 'build/pages/bleprinter/bleprinter.html'
})
export class BleprinterPage {
  Printer: string = 'None';
  constructor(private navCtrl: NavController) {

  }

  ionViewLoaded() {
    this.Printer = 'Ready';
   BLE.isEnabled().then((e) => {
  this.Printer = 'Enabled';
   },
   (e) => {
 this.Printer = 'not Enabled';
   });
         BLE.connect('00:19:5D:31:88:E4').subscribe(peripheralData => {
          this.Printer = peripheralData;
        },
        peripheralData => {
          this.Printer = 'disconnected';
       });
  }



}
