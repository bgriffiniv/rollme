import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './../../services/data/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  keys;
  id;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    console.log("Profile page started (constructor)");

  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.user,
        parent: 'profile'
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  ngOnInit() {
    console.log("Profile page started (init)");
  }

}
