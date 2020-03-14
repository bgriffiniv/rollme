import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contact;
  keys;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("Contact page started (constructor)");

    let contactId;

    if (this.router.getCurrentNavigation().extras.state) {
      //this.parent = this.router.getCurrentNavigation().extras.state.parent;
      contactId = this.router.getCurrentNavigation().extras.state.data;
    }

    this.userService.getUser(contactId, (err, data) => {
      if (!err) {
        this.card = data;
      }
    });
    this.keys = Object.keys(this.contact);
    this.keys.splice(this.keys.indexOf("contacts"), 1);

  }

  ngOnInit() {
    console.log("Contact page started (init)");

  }

}
