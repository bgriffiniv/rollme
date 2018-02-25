import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class DataServiceProvider {

//  public events: any;
//  public units: any;
//  public tasks: any;
//  public parts: any;
  public users: any;
  public auth: any;

  constructor(/*public http: HttpClient*/) {
    console.log('Hello DataServiceProvider Provider');
//    this.events = firebase.database().ref('/events/');
//    this.units = firebase.database().ref('/units/');
//    this.tasks = firebase.database().ref('/tasks/');
//    this.parts = firebase.database().ref('/tasks/parts/');
  }

  init() {
    // Initialize Firebase

    try {
      firebase.initializeApp({
        apiKey: "AIzaSyCOwTEY-c9hziBS5gqZoFjEQkn9R_Qmc7g",
        authDomain: "rollme-4308a.firebaseapp.com",
        databaseURL: "https://rollme-4308a.firebaseio.com",
        projectId: "rollme-4308a",
        storageBucket: "rollme-4308a.appspot.com",
        messagingSenderId: "768651667072"
      });
    } catch(err) {
      if ( !err.message.includes('already exists') ) {
        console.error('Firebase initialization error', err.stack)
      } else {
        console.log('Ignoring duplicate Firebase error...');
      }
    }

    this.users = firebase.database().ref('/users');
    this.auth = firebase.auth();
  }
}
