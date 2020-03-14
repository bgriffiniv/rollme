import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Auth Service constructor');
    this.user = afAuth.authState;
  }

  // Returns true if user is logged in
  isAuthenticated(): boolean {
    //console.log('Current user:', firebase.auth().currentUser);
    return firebase.auth().currentUser !== null;
  }

  getCurrentUserId(): string {
    return firebase.auth().currentUser.uid;
  }

  // Returns current user data
  getCurrentUser(callback) {
    this.subscription = this.afAuth.authState
    .subscribe(d => {
      console.log('Successfully got auth state', d);
      callback(null, d);
    }, e => {
      console.log('Somethiconsong went wrong:', e.message);
      callback(e);
    });
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
}
