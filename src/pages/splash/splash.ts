import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, NavParams, NavController, ViewController } from 'ionic-angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../login/login';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  providers: [DataProvider]
})

export class Splash {
      public lottieConfig: Object;
      private anim: any;
      private animationSpeed: number = 1;

  constructor(public navCtrl: NavController, menuCtrl: MenuController, data: DataProvider, navParams: NavParams,
      public splashScreen: SplashScreen) {
      LottieAnimationViewModule.forRoot();

      this.lottieConfig = {
          container: document.getElementById('logoSplash'),
          loop: false,
          autoplay: true,
          path: 'assets/animations/RollMe_Logo_NoBG.json'
      }

  }

  navigateToLoginPage() {
    this.navCtrl.push(LoginPage)
  }


  handleAnimation(anim: any) {
      this.anim = anim;
  };

}

