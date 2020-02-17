import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.page.html',
  styleUrls: ['./link.page.scss'],
})
export class LinkPage implements OnInit {
id;
userDataList;
parent;

  constructor(private dataService: DataService, private userService: UserService, private route: ActivatedRoute, private router: Router) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.parent = this.router.getCurrentNavigation().extras.state.parent;
    }

    this.id = this.dataService.getUserId();
    this.userDataList = this.dataService.listUsers();

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
