import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Auth Service constructor');
  }

  ngOnInit() {
    console.log('Auth Service init');
    this.user = this.afAuth.authState;
    console.log(this.user);
  }


  // Returns true if user is logged in
  isAuthenticated(): boolean {
    //console.log('Current user:', firebase.auth().currentUser);
    return this.user !== null;
  }

  // Returns current user data
  getCurrentUser(): Observable<firebase.User> {
    return this.user;
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}
