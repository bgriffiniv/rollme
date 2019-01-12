import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Directive, Component, NgModule } from '../../../node_modules/@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@NgModule({
    providers: [Facebook]
  })

export class FacebookManager{
  constructor(private facebook: Facebook) {}

  facebookLogin(): Promise<any> {
      return this.facebook.login(['email'])
        .then( response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
            .then( success => {
              console.log("Firebase success: " + JSON.stringify(success));
            });
        }).catch((error) => { console.log(error) })
      }
  }





