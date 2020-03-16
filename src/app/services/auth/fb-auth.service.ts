import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FbAuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router, private activatedRoute: ActivatedRoute, public ngZone: NgZone) { }

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

}
