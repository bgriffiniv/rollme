import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { UserService, User } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contact: User;
  keys;
  id;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log("Contact Page Start");
  }

  ngOnInit() {
    console.log("Contact Page Init");
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      console.log("Contact ID: ", this.id);
      this.userService.getUser(this.id, (error, data) => {
        if (error) {
          console.log('Get contact error: ', error);
        } else {
          console.log('Contact: ', data);
          this.contact = data;
          this.keys = Object.keys(this.contact);
          this.keys.splice(this.keys.indexOf("contacts"), 1);
        }
      });
    } else {
      this.contact.name = "New User";
    }
  }
}
