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

  currentUser;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) {
    console.log("Home page started (constructor)");
  }

  async getCurrentUserCallback() {
    try {
      let user = await this.userService.getUser(this.currentUser.uid);
      console.log('Home Page : Get User Data Success', user);

      if (!user) {
        // go to Successful Signup Page if no user exists
        let navigationExtras: NavigationExtras = {
          state: {
            uid: this.currentUser.uid,
            firstName: '',
            lastName: '',
            email: '',
            mobile: ''
          }
        };
        this.router.navigateByUrl('/successful-signup', navigationExtras);
      }
      return;
    } catch(error) {
      console.log('Home Page : Get User Data Failure', error.message);
    }
  }

  async ngOnInit() {
    console.log("Home page started (init)");

    // get the current user's uid
    try {
      this.currentUser = await this.authService.getCurrentUser();
      if (!this.currentUser) {
        console.log('Home Page : Currently logged out');
        this.router.navigateByUrl('/login');
      }

      this.getCurrentUserCallback();
    } catch(error) {
      console.log('Home Page : Get Current User Failure', error.message);
    }
  }
}
