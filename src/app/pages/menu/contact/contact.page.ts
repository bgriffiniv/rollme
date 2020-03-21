import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contactId;
  contact;
  keys;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    console.log("Contact page started (constructor)");


  }

  async ngOnInit() {
    console.log("Contact page started (init)");

    if (this.router.getCurrentNavigation().extras.state) {
      //this.parent = this.router.getCurrentNavigation().extras.state.parent;
      this.contactId = this.router.getCurrentNavigation().extras.state.data;
    }
    this.contact = await this.userService.getUser(this.contactId);
    this.keys = Object.keys(this.contact);
    this.keys.splice(this.keys.indexOf("contacts"), 1);
  }

}
