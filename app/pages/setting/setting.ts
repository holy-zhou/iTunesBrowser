import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/setting/setting.html'
})
export class SettingsPage {
  countries: any;
  selectCountry: any;
  constructor(public navCtrl: NavController) {
    this.countries = [
      {
        name: 'United States',
        local_name: 'USA',
        code: 'US',
        currency: 'Dollar',
      },
      {
        name: 'United Kingdom',
        local_name: 'The UK',
        code: 'UK',
        currency: 'Pound',
      },
      {
        name: 'Israel',
        local_name: 'Israel',
        code: 'Israel',
        rtl: true
      }
    ];
    this.selectCountry = this.countries[0];
  }
}
