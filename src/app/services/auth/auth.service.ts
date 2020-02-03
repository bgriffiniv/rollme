import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  signUp(email: string, password: string) {
    return this.firebaseService.SignUp(email, password);
  }

  signIn(email: string, password: string) {
    this.firebaseService.SignIn(email, password);
  }

  signOut() {
    this.firebaseService.SignOut();
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
