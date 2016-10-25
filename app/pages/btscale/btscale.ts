import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'build/pages/btscale/btscale.html'
})

export class BtscalePage {
  Status: string = 'None';
  Result: string;
  Reader: any;

  constructor(private navCtrl: NavController) {

  }

  ionViewLoaded() {
    this.Status = 'Ready';
    BluetoothSerial.isEnabled().then((e) => {
      this.Status = 'Enabled->' + e;
    }, (err) => {
      this.Status = 'not Enabled->' + err;
    });

    BluetoothSerial.connect('00:14:AA:30:30:5A').subscribe((e) => {
      this.Status = 'Connected->' + e;
    }, (err) => {
      this.Status = 'not Connected->' + err;
    });
  }
  readScale() {
    this.doRead().then((e) => {
      this.Result = e;
      this.Reader.unsubscribe();
    }, (err) => { this.Status = err; });
  }

  doRead(): Promise<string> {
    let isValid = false;
    let result: Promise<string> = new Promise<string>((resolve, reject) => {
      BluetoothSerial.clear().then((eclear) => {
        console.log(eclear);
        this.Reader = BluetoothSerial.subscribe('\r\n').subscribe((e) => {
          console.log(e);
          if (isValid) {
            resolve(e);
          } else { isValid = !isValid; }
        }, (err) => {
          reject(err);
        }, () => {
          reject('Read->Complete');
        });
      });


    });
    return result;
  }
}
