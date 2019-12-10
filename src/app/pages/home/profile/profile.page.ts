import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './../../../services/data/data.service';
import { UserService } from './../../../services/user/user.service';


@Component({
selector: 'app-profile',
templateUrl: './profile.page.html',
styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  keys;
  id;

constructor(private dataService: DataService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  goToEditPage() {
      let navigationExtras: NavigationExtras = {
      state: {
        data: this.user,
        parent: 'profile'
      }
    };
    this.router.navigateByUrl('/edit');
  }

  ngOnInit() {
  }

}
