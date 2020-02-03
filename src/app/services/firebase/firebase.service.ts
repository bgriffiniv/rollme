import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    /*this.afAuth.auth.subscribe((auth) => {
      this.userData = auth.authState;
    });*/
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.afAuth
      .auth
      .signOut();
  }

}
