import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Auth Service constructor');
  }

  // Returns true if user is logged in
  isAuthenticated(callback: (error, data?) => void) {
    this.getCurrentUser((error, data) => {
      if (error) {
        callback(error);
      } else {
        callback(null, (data !== null)); // boolean
      }
    });
  }

  getCurrentUser(callback: (error, data?) => void) {
    this.afAuth.authState // Observable<firebase.User>
    .pipe(
      tap(
        data => {callback(null, data)},
        error => {callback(error)}
      )
    ).subscribe();
  }

  signUp(email: string, password: string, callback: (error, data?) => void) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password) // Promise<any>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  signIn(email: string, password: string, callback: (error, data?) => void) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password) // Promise<any>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
  }

  signOut(callback: (error, data?) => void) {
    this.afAuth.auth.signOut() // Promise<void>
    .then(
      data => {callback(null, data)},
      error => {callback(error)}
    );
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

    // Returns
    get currentUserObservable(): any {
      return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }

    // Anonymous User
    get currentUserAnonymous(): boolean {
      return this.authenticated ? this.authState.isAnonymous : false
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
      if (!this.authState) { return 'Guest' }
      else if (this.currentUserAnonymous) { return 'Anonymous' }
      else { return this.authState['displayName'] || 'User without a Name' }
    }

    //// Social Auth ////

    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider()
      return this.socialSignIn(provider);
    }

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.socialSignIn(provider);
    }

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      return this.socialSignIn(provider);
    }

    twitterLogin(){
      const provider = new firebase.auth.TwitterAuthProvider()
      return this.socialSignIn(provider);
    }

    private socialSignIn(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) =>  {
            this.authState = credential.user
            this.updateUserData()
        })
        .catch(error => console.log(error));
    }


    //// Anonymous Auth ////

    anonymousLogin() {
      return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
    }

    //// Email/Password Auth ////

    emailSignUp(email:string, password:string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user
          this.updateUserData()
        })
        .catch(error => console.log(error));
    }

    emailLogin(email:string, password:string) {
       return this.afAuth.auth.signInWithEmailAndPassword(email, password)
         .then((user) => {
           this.authState = user
           this.updateUserData()
         })
         .catch(error => console.log(error));
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
      var auth = firebase.auth();

      return auth.sendPasswordResetEmail(email)
        .then(() => console.log("email sent"))
        .catch((error) => console.log(error))
    }


    //// Sign Out ////

    signOut(): void {
      this.afAuth.auth.signOut();
      this.router.navigate(['/'])
    }


    //// Helpers ////

    private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

      let path = `users/${this.currentUserId}`; // Endpoint on firebase
      let data = {
                    email: this.authState.email,
                    name: this.authState.displayName
                  }

      this.db.object(path).update(data)
      .catch(error => console.log(error));

    }
*/

}
