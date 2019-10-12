import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { DataService } from './../../services/data/data.service';

@Component({
  selector: 'app-rolodex',
  templateUrl: './rolodex.page.html',
  styleUrls: ['./rolodex.page.scss'],
})
export class RolodexPage implements OnInit {

  user;
  index;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    console.log("Rolodex page started (constructor)");

    this.route.data.subscribe((data) => {
      if (this.router.getCurrentNavigation().extras.state) {
        let updated = this.router.getCurrentNavigation().extras.state.data;
        //let index = this.router.getCurrentNavigation().extras.state.index;
        //this.user.contacts[this.index] = updated;
        this.dataService.setContact("default", this.index, updated);
      }

      this.refresh();
    });
  }

  goToEditPage(index) {
    this.index = index;
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.user.contacts[index].data,
        parent: 'rolodex'
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  addContact() {
    this.index = this.user.contacts.length;
    let navigationExtras: NavigationExtras = {
      state: {
        data: [
          {key: "name", value: ""},
          {key: "company", value: ""},
          {key: "role", value: ""},
          {key: "email", value: ""}
        ],
        parent: 'rolodex'
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  deleteContact(index) {
    this.dataService.deleteContact("default", index);
    console.log(this.user);
    //this.refresh();
  }

  ngOnInit() {
    console.log("Rolodex page started (init)");

  }

  refresh() {
    this.user = this.dataService.getUser("default");
  }
}
