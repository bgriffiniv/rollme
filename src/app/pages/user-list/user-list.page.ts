import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './../../services/data/data.service';
import { UserService, User } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  private users: Observable<User[]>;

  constructor(private dataService: DataService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    console.log("User List page started (constructor)");
  }

  ngOnInit() {
    console.log("User List page started (init)");
    this.users = this.userService.getUsers();
  }

}
