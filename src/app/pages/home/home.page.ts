import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { tap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) {
    console.log("Home page started (constructor)");
  }

  ngOnInit() {
    console.log("Home page started (init)");
    // check for a user entry by the uid
    let goToSuccessfulSignupPageIfNoData = false;

    // get the current user's uid
    this.authService.getCurrentUser().pipe(
      tap(currentUser => {
        if (!currentUser) {
          console.log('Home Page : Currently logged out');
          return;
        }

        this.userService.getUser(currentUser.uid).pipe(

          tap(data => {
            console.log(data);
            if (!data) {
              // go to Successful Signup Page if no user exists
              let navigationExtras: NavigationExtras = {
                      state: {
                        uid: currentUser.uid,
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobile: ''
                      }
                    };
              this.router.navigateByUrl('/successful-signup', navigationExtras);
            }
          }),
          catchError((error, caught) => {
            console.log(error);
            return null;
          })

        ).subscribe();

      })
    ).subscribe();
  }
}
