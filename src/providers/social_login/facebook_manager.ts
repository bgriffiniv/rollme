import { Facebook } from '@ionic-native/facebook';
import firebase from '@ionic-native/facebook';

export class FacebookManager{
  constructor(private facebook: Facebook) {}

  facebookLogin(): Promise<any> {
      return this.facebook.login(['email']);
        .then( response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
            .then( success => {
              console.log("Firebase success: " + JSON.stringify(success));
            });
        }).catch((error) => { console.log(error) });
      }
  }
