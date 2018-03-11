import { Component } from '@angular/core';
import { NavParams, MenuController  } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [DataProvider]
})
export class RegisterPage {

  userEmail: string;
  userPassword: string;
  //confirmPassword: string;
  data: any;

  constructor(menuCtrl: MenuController, data: DataProvider, navParams: NavParams) {
    console.log('Hello Register Page');
    menuCtrl.enable(true);

    data.init();
    this.data = data;
  }

  register() {
    this.userEmail += '';
    this.userPassword += '';
    //this.confirmPassword += '';
    //if password mismatch, return error
    this.data.register(this.userEmail, this.userPassword)
    .then((data) => {
      console.log('Register');
    }).catch(err => {
      console.error('Register error: ', err.message);
    });
  }
}
