import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CardEditorPage } from '../pages/cardeditor/cardeditor';

import { DataProvider } from '../providers/data/data';

@Component({
  templateUrl: 'app.html',
  providers: [DataProvider]
})


export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'TabsPage';
  data: any;
  uid: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, data: DataProvider) {
    console.log('Hello App Components');
    data.init();
    this.data = data;

    /*
    let fireBaseUser = data.auth.currentUser;
    console.log(fireBaseUser);
    */

    this.data.auth.onAuthStateChanged((user) => {
      console.log('Auth state changed');
      if ( user ) {
        this.uid = user.uid;
        console.log(user.email + ' signed in');
        this.nav.setRoot(HomePage, {uid: user.uid}); //I've tried also with this.rootPage = HomePage and the behavior is the same
      } else {
        this.uid = null;
        console.log('no user signed in');
        this.nav.setRoot(LoginPage);  //I've tried also with this.rootPage = LoginPage and the behavior is the same
      }
    });
    console.log('Auth change callback set');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log('Splash screen hidden');
    });
  }

  logout() {
    console.log('Logout');
    this.data.logout();
    //this.nav.setRoot(LoginPage);
  };
 };
