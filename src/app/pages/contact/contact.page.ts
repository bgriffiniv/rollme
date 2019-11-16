import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { DataService } from './../../services/data/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contact;
  index;
  parent;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    console.log("Contact page started (constructor)");

    this.route.data.subscribe((data) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.index;
        this.parent = this.router.getCurrentNavigation().extras.state.parent;
        let updated = this.router.getCurrentNavigation().extras.state.data;
        this.dataService.setContact("default", this.index, updated);
      }
      //let current = this.dataService.getUser(this.index);
      //this.contact = current;

    });
  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.contact.data,
        parent: 'contact'
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  goToRolodexPage() {
      let navigationExtras: NavigationExtras = {
        state: {
          data: this.contact.data,
        }
      };
      this.router.navigate(this.parent, navigationExtras);
    }

  ngOnInit() {
    console.log("Contact page started (init)");

  }

}
