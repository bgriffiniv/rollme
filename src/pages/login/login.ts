import { Component/*, ViewChild*/ } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import { HomePage } from '../home/home';

import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DataProvider]
})
export class LoginPage {

  userEmail: string;
  userPassword: string;
  data: any;
  menuCtrl: any;
  navCtrl: any;

  constructor(navCtrl: NavController, public navParams: NavParams, menuCtrl: MenuController, data: DataProvider) {
    console.log('Hello Login Page');
    data.init();
    this.data = data;

    menuCtrl.enable(false);
    this.menuCtrl = menuCtrl;
    this.navCtrl = navCtrl;

    this.userEmail = '';
    this.userPassword = '';
  }

  login() {
    this.userEmail += '';
    this.userPassword += '';
    this.data.login(this.userEmail, this.userPassword)
    .then((data) => {
      console.log('Login');
      this.menuCtrl.enable(true);
      //this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      console.error('Login error: ', err.message);
    });
  }

  moveToHome() {
    this.navCtrl.push(HomePage);
  }
}
