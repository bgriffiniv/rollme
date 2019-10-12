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

    this.route.data.subscribe((data) => {
      if (this.router.getCurrentNavigation().extras.state) {
        let updated = this.router.getCurrentNavigation().extras.state.data;
        this.dataService.setUser("default", updated);
      }
      let current = this.dataService.getUser("default");
      this.user = current;

    });
  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.user.data,
        parent: 'profile'
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  ngOnInit() {
    console.log("Profile page started (init)");

  }

}
