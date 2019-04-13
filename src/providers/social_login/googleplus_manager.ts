import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Injectable } from '@angular/core';
import {  NgModule } from '../../../node_modules/@angular/core';
import { IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import {Events} from 'ionic-angular';

@NgModule({
      providers: [GooglePlus]
})

@Injectable()
export class GooglePlusManager {
userProfile: any = null;

  constructor (private googlePlus: GooglePlus, private event:Events){
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.userProfile = user;
      } else {
          this.userProfile = null;
      }
    });
    this.event.subscribe('signIn_Google',() => {
      console.log("Signing In...")
      this.googleLogin();
    })
  }

  googleLogin(): void {
    this.googlePlus.login({
      'webClientId': '768651667072-o0atqb4b0o8q4u4i6n6cc8opujff9eo5.apps.googleusercontent.com',
      'offline': true
    }).then(res => console.log(res))
      .catch(err => console.error(err));
  }
}
