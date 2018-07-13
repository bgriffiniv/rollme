import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class DataProvider {

  public root: any;
  public auth: any;

  constructor() {
    console.log('Hello Data Provider');
  }

  init() {
    try {
      firebase.initializeApp({
        apiKey: "AIzaSyCOwTEY-c9hziBS5gqZoFjEQkn9R_Qmc7g",
        authDomain: "rollme-4308a.firebaseapp.com",
        databaseURL: "https://rollme-4308a.firebaseio.com",
        projectId: "rollme-4308a",
        storageBucket: "rollme-4308a.appspot.com",
        messagingSenderId: "768651667072"
      });
      console.log('Firebase initialized');

    } catch( err ) {
      if ( !err.message.includes('already exists') ) {
        console.error('Firebase initialization error', err.stack)
      } else {
        console.log('Ignoring duplicate Firebase initialization error...');
      }
    }
    if ( this.root==null || this.auth==null ) {
      this.root = firebase.database().ref();
      this.auth = firebase.auth();
      console.log('Firebase root and auth saved');
    }
  }

  register(userEmail: string, userPassword: string) {
    return this.auth.createUserWithEmailAndPassword(userEmail, userPassword);
  }

  login(userEmail: string, userPassword: string) {
    return this.auth.signInWithEmailAndPassword(userEmail, userPassword);
  }

  logout() {
    return this.auth.signOut();
  }

}
