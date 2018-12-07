import { Component/*, ViewChild*/ } from '@angular/core';
import { NavController, MenuController  } from 'ionic-angular';
import { IonicPage, NavParams  } from 'ionic-angular';
import { HomePage } from '../home/home';

import { DataProvider } from '../../providers/data/data';
import { LinkedInManager } from '../../providers/social_login/linkedin_manager';

import { RegisterPage } from '../register/register';

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

  constructor(navCtrl: NavController, menuCtrl: MenuController, data: DataProvider, private linkedIn:LinkedInManager) {
    console.log('Hello Login Page');
    data.init();
    this.data = data;

    menuCtrl.enable(false);
    this.menuCtrl = menuCtrl;

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

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  signInLinkedIn(){
    //this.event.publish('signIn_LinkedIn');
  }
}
