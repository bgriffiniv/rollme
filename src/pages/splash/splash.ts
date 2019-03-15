import { Component } from '@angular/core';
import { MenuController, NavParams, NavController, Events } from 'ionic-angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import $ from 'jquery';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import {LinkedInManager} from '../../providers/social_login/linkedin_manager';
import {FacebookManager} from '../../providers/social_login/facebook_manager';
import {GooglePlusManager} from '../../providers/social_login/googleplus_manager';


import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  providers: [DataProvider, GooglePlusManager, LinkedInManager, FacebookManager]
})

export class Splash {
      public lottieConfig: Object;
      private anim: any;
      private linked
      //private animationSpeed: number = 1;


  constructor(public navCtrl: NavController, menuCtrl: MenuController, data: DataProvider, navParams: NavParams,
      public splashScreen: SplashScreen, private events:Events, private linkedInManager:LinkedInManager,
      private googlePlusManager:GooglePlusManager, private facebookManager:FacebookManager) {
      LottieAnimationViewModule.forRoot();

      this.lottieConfig = {
          container: document.getElementById('logoSplash'),
          loop: false,
          autoplay: true,
          path: 'assets/animations/RollMe_Logo_750x750.json'
      };

      setTimeout(function(){
      $('#login').hide().delay(1000).fadeIn(1200);
      $('#signup').hide().delay(1000).fadeIn(1200)
      });
  };



  signupRedirect() {
     $("#signup-form").animate({height: "toggle", opacity: "toggle"}, "slow")
     $('#formContainer').fadeIn()
     $('#login-form').hide()
  };

  loginRedirect() {
     $("#login-form").animate({height: "toggle", opacity: "toggle"}, "slow")
     $('#formContainer').fadeIn()
     $('#signup-form').hide()
  };

  toggleLogin(ev) {
     $("#login-form").animate({height: "toggle", opacity: "toggle"}, "slow")
     $('#formContainer').fadeIn()
     $('#login').fadeOut()
     $('#signup').fadeOut()
  };

  toggleSignup() {
     $("#signup-form").animate({height: "toggle", opacity: "toggle"}, "slow")
     $('#formContainer').fadeIn()
     $('#signup').fadeOut()
     $('#login').fadeOut()
  };

  handleAnimation(anim: any) {
      this.anim = anim;
  };

  navigateToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  navToHomePage(){
    this.navCtrl.push(HomePage);
  }

  googleLogin() {
      this.events.publish('signIn_Google');
  }

  facebookLogin(){
      this.events.publish('signIn_Facebook');
  }

  linkedInLogin(){
      this.events.publish('signIn_LinkedIn');
  }

   login() {
      console.log("LOGIN");
   }

   signUp(){
      console.log("SIGNUP");
   }

}
