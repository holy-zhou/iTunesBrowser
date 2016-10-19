import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';
import { TicketModel } from './ticket';

@Component({
  templateUrl: 'build/pages/btprinter/btprinter.html'
})
export class BtprinterPage {
  Printer: string = 'None';
  Result: string;
  Ticket: TicketModel;
  constructor(private navCtrl: NavController) {
    this.Ticket = new TicketModel();
  }

  ionViewLoaded() {
    this.Printer = 'Ready';
    BluetoothSerial.isEnabled().then((e) => {
      this.Printer = 'Enabled->' + e;

    }, (e) => {
      this.Printer = 'not Enabled';
    });

  }
  printTicket() {
    this.Ticket.Print('00:19:5D:31:88:E4').then((e) => {
      this.Result = e;
    });
  }
}
