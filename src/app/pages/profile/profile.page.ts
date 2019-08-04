import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { DataService } from './../../services/data/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    console.log("Profile page started (constructor)");
    var defaultUser = {
      name : "Burnest Griffin IV",
      company : "IdeaLogic",
      role : "Developer"
    };

    this.route.data.subscribe((data) => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log("use passed data");
        this.user = this.router.getCurrentNavigation().extras.state.user;
      } else {
        console.log("use default user");
        this.user = defaultUser;
      }
    });
  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
        parent: 'profile'
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  ngOnInit() {
    console.log("Profile page started (init)");

  }

}
