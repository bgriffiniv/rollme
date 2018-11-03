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
  //@ViewChild(Nav) nav: Nav;
  //navCtrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, menuCtrl: MenuController, data: DataProvider) {
    console.log('Hello Login Page');
    data.init();
    this.data = data;

    menuCtrl.enable(false);
    this.menuCtrl = menuCtrl;
    //this.navCtrl = navCtrl;

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
    }).catch(err => {
      console.error('Login error: ', err.message);
    });
  }

  navToHomePage() {
    this.navCtrl.push(HomePage);
  }
}
