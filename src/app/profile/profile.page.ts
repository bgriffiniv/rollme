import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  constructor(private router: Router) {
    console.log("Profile page started (constructor)");
      var defaultUser = {
        name : "Burnest Griffin IV",
        company : "IdeaLogic",
        role : "Developer"
      };

      this.user = defaultUser;
  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['profile/edit'], navigationExtras);
  }

  ngOnInit() {
    console.log("Profile page started (init)");

  }

}
