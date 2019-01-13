import { GooglePlus } from '@ionic-native/google-plus';
import { Injectable } from '@angular/core';
import { Directive, Component, NgModule } from '../../../node_modules/@angular/core';
import { IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@NgModule({
      providers: [GooglePlus]
})

@Injectable()
export class GooglePlusManager {
userProfile: any = null;

  constructor (private googlePlus: GooglePlus){
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.userProfile = user;
      } else {
          this.userProfile = null;
      }
    });
  }

  googleLogin(): void {
    this.googlePlus.login({
      'webClientId': '768651667072-o0atqb4b0o8q4u4i6n6cc8opujff9eo5.apps.googleusercontent.com',
      'offline': true
    }).then(res => console.log(res))
      .catch(err => console.error(err));
  }
}
