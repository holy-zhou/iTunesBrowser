import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  template: `
  <ion-content padding>
    <h2>{{track.trackName}}</h2>
      <audio [src]="track.previewUrl" *ngIf="track.kind === 'song'"
        autoplay = "autoplay" controls = "controls">
          Browser does not support
      </audio>
      <video [src]="track.previewUrl" *ngIf="track.kind === 'feature-movie'"
        autoplay = "autoplay" controls = "controls">
          Browser does not support
      </video>
      <button (click)="close()">Close</button>
  </ion-content>
  `
})

export class PreviewModal {
  public track: any;
  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.track = params.data.track;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
