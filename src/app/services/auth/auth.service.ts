import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

//import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
//import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signUp(email: string, password: string, callback) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed up!', res);
      callback(null, res);
    })
    .catch(err => {
      console.log('Something is wrong:', err.message);
      callback(err);
    });
  }

  signIn(email: string, password: string, callback) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!', res);
      callback(null, res);
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
      callback(err)
    });
  }

  signOut(callback) {
    this.afAuth.auth.signOut()
    .then(res => {
      console.log('Successfully signed out!', res);
      callback(null, res);
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
      callback(err)
    });
  }

/*
  fbAuth() {
      return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          })
          console.log('You have been successfully logged in!')
      }).catch((error) => {
          console.log(error)
      });
  }
*/

}
