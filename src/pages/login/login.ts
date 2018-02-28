import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DataProvider]
})
export class LoginPage {

  userEmail: string;
  userPassword: string;
  myData: any;
  user: any;

  constructor(public navCtrl: NavController, data: DataProvider) {
    data.init();
    this.user = data.auth.currentUser;
    console.log(JSON.stringify(this.user));

    this.myData = data;

  }

  login() {
    this.myData.login(this.userEmail, this.userPassword)
    .then(
      data => {
        console.log('Login Success!');
        this.user = data;
      },
      err => {
        console.log('Login Failure!');
      }
    );
  }

  logout() {
    this.myData.logout()
    .then(
      data => {
        console.log('Logout Success!');
        this.user = null;
      },
      err => {
        console.log('Logout Failure!');
      }
    );
  }

  hasUser() {
    return this.myData.hasUser();
  }
}
