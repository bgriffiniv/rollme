import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) {
    console.log("Home page started (constructor)");
  }

  ngOnInit() {
    console.log("Home page started (init)");
    // get the current user's uid
    let currentUser = this.authService.getCurrentUser();

    // check for a user entry by the uid
    let doHomePageChecks = (err, data) => {
      if (err) {
        console.log(err);
      }

      if (!(data && data.uid)) {
        // go to Successful Signup Page if no user exists
        goToSuccessfulSignupPage(currentUser.uid);
      }
    };

    let goToSuccessfulSignupPage = (uid) => {

      let navigationExtras:NavigationExtras = {
        state: {
          uid: uid
        }
      };
      this.router.navigateByUrl('/successful-signup', navigationExtras);

    }
    this.userService.getUser(currentUser.uid, doHomePageChecks);
  }
}
