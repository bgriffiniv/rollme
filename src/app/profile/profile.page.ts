import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Profile page started (constructor)");
      var defaultUser = {
        name : "Burnest Griffin IV",
        company : "IdeaLogic",
        role : "Developer"
      };

      //this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          console.log("use passed data");
          this.user = this.router.getCurrentNavigation().extras.state.user;
        } else {
          console.log("use default user");
          this.user = defaultUser;
        }
      //});
  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
        parent: "profile"
      }
    };
    this.router.navigate(['profile/edit'], navigationExtras);
  }

  ngOnInit() {
    console.log("Profile page started (init)");

  }

}
