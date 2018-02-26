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
  //myData: DataProvider;
  user: any;

  constructor(public navCtrl: NavController, data: DataProvider) {
    data.init();
    //this.myData = data;
    this.user = data.auth().currentUser;
    console.log(JSON.stringify(this.user));
    this.login = function () {
      data.login(this.userEmail, this.userPassword)
      .then(data => console.log('Login Success!'), err => console.log('Login Failure!'));
    }

  }


}
