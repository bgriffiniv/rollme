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
          this.user = {
                name : "Burnest Griffin IV",
                company : "IdeaLogic",
                role : "Developer"
              };
  }

  goToEditPage() {

      this.router.navigate(['profile/edit']);
  }

  ngOnInit() {
    console.log("Profile page started (init)");

  }

}
