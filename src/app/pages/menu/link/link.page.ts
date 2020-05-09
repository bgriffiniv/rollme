import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { UserService, User } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.page.html',
  styleUrls: ['./link.page.scss'],
})
export class LinkPage implements OnInit {
id;
userDataList;
parent;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.parent = this.router.getCurrentNavigation().extras.state.parent;
    }

    this.id = this.authService.getCurrentUserId();
    this.userDataList = this.userService.listUsers();

  }

  ngOnInit() {
  }


  linkContact(index: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: index
      }
    };
    this.router.navigate([this.parent], navigationExtras);
  }

}
