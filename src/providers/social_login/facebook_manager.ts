import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Injectable } from '@angular/core';
import { Directive, Component, NgModule } from '../../../node_modules/@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Events} from 'ionic-angular';

@NgModule({
    providers: [Facebook]
  })

  @Injectable()
export class FacebookManager{
isLoggedIn:boolean = false;
users: any;

constructor(private fb: Facebook) {
  fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

fbLogin() {
this.fb.login(['public_profile', 'user_friends', 'email'])
  .then(res => {
    if(res.status === "connected") {
      this.isLoggedIn = true;
      this.getUserDetail(res.authResponse.userID);
    } else {
      this.isLoggedIn = false;
    }
  })
  .catch(e => console.log('Error logging into Facebook', e));
}

logout() {
this.fb.logout()
  .then( res => this.isLoggedIn = false)
  .catch(e => console.log('Error logging out of Facebook', e));
  }

getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields-id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log(res);
      this.users = res;
    })
    .catch(e => {
      console.log(e);
    });
  }
}





