import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { GoogleUser } from 'src/app/services/user/google-user.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  googleUser: GoogleUser;

  constructor(private router: Router, public afAuth: AngularFireAuth, public ngZone: NgZone, private angularFireAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(googleUser => {
            this.googleUser = googleUser;
    })
  }

// Firebase SignInWithPopup
    OAuthProvider(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((res) => {
                this.ngZone.run(() => {
                    this.router.navigate(['home']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

// Firebase Google Sign-in
    SigninWithGoogle() {
        return this.OAuthProvider(new auth.GoogleAuthProvider())
            .then(res => {
                console.log('Successfully logged in!')
            }).catch(error => {
                console.log(error)
            });
    }

// Firebase Logout
    SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['login']);
        })
    }
}
