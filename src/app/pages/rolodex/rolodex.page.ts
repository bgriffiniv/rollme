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

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    console.log("Rolodex page started (constructor)");

    this.route.data.subscribe((data) => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log("save passed data");
        let updated = this.router.getCurrentNavigation().extras.state.user;
        console.log(updated);
        let index = this.router.getCurrentNavigation().extras.state.index;
        this.user.contacts[index] = updated;
        this.dataService.setUser("default", this.user);
      }
      console.log("get saved user");
      let current = this.dataService.getUser("default");
      console.log(current);
      this.user = current;
    });
  }

  goToEditPage(contact, index) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: contact,
        parent: 'rolodex',
        index: index
      }
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  ngOnInit() {
    console.log("Rolodex page started (init)");

  }

}
