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
    this.afAuth.authState.subscribe((user) => {
      this.currentUser = user;
    });
  }

 // Returns true if user is logged in
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Returns current user data
  getCurrentUser(): firebase.User {
    return this.isAuthenticated() ? this.currentUser : null;
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
