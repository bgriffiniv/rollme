import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) {
    console.log("Home page started constructor");
  }

  ngOnInit() {
    console.log("Home page started init");
    // check for a user entry by the uid
    let goToSuccessfulSignupPageIfNoData = false;

    // get the current user's uid
    this.authService.getCurrentUser(getCurrentUserCallback);

    var getCurrentUserCallback = (error, data) => {
      if (error) {
        console.log('get current user error: ', error);
      } else {
        if (!data) {
          console.log('Home Page : Currently logged out');
          this.router.navigateByUrl('/login');
        }

        this.userService.getUser(data.uid, getUserCallback); // FIXME: why get this data again?
      }
    };

    var getUserCallback = (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        // go to Successful Signup Page if no user exists
        let navigationExtras: NavigationExtras = {
                state: {
                  uid: data.uid,
                  firstName: '',
                  lastName: '',
                  email: '',
                  mobile: ''
                }
              };
        this.router.navigateByUrl('/successful-signup', navigationExtras);
      }
    };
  }
}
