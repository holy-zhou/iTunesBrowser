import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/common';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/contactus/contactus.html',
})
export class ContactusPage {

  contactForm: any;
  constructor(private navCtrl: NavController, fb: FormBuilder) {
    this.contactForm = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.required]
    });
  }

  submitForm() {
    debugger;
  }
}
