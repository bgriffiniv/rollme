import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { DataService } from './../../../services/data/data.service';
import { UserService } from './../../../services/user/user.service';

@Component({
selector: 'app-rolodex',
templateUrl: './rolodex.page.html',
styleUrls: ['./rolodex.page.scss'],
})
export class RolodexPage implements OnInit {
  user;
  contactDataList;
  index;
  id;

constructor(private dataService: DataService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  deleteContact(index) {
    this.dataService.setContact(this.id, index, false);
    this.refresh();
  }

  goToContactPage(index) {
    this.index = index;
    let navigationExtras: NavigationExtras = {
      state: {
        data: index,
        parent: 'rolodex'
      }
    };
    this.router.navigate(['contact'], navigationExtras);
  }

  refresh() {
    this.user = this.dataService.getUser(this.id);

    // TODO: Page over this data when too large!
    this.contactDataList = [];
    for (let contactId in this.user.contacts) {
      let contactData = {
        id: contactId,
        name: this.dataService.getUser(contactId).name
      };
      this.contactDataList.push(contactData);
    }
  }

  ngOnInit() {
  }

}
