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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    console.log("Home page started (constructor)");
  }

  ngOnInit() {
    console.log("Home page started (init)");
    // check for a user entry by the uid
    // get the current user's uid
    this.authService.getCurrentUser((error, currentUser) => {
      if (!currentUser) {
        console.log('Home Page : Currently logged out');
        this.router.navigateByUrl('login');
      }
      this.userService.getUser(currentUser.uid, (err, data) => {
        if (err) {
          console.log(err);
          this.router.navigateByUrl('login');
        }
        console.log(data);
        if (!data) {
          // go to Successful Signup Page if no user data exists for this uid
          // let user fill in missing data in settings page later
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
      });
    });
  }
}
