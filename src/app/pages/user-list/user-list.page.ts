import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './../../services/data/data.service';
import { UserService, User } from 'src/app/services/user/user.service';

import { tap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users:any[];

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    console.log("User List page started (constructor)");
  }

  ngOnInit() {
    console.log("User List page started (init)");
    this.userService.getStaticUsers().pipe(
      tap(staticUsers => {
        this.users = staticUsers;
        console.log(staticUsers);
      }),
      catchError((error, caught) => {
        if (error) {
          console.log(error);
        }
        return null;
      })
    ).subscribe();
  }
}
