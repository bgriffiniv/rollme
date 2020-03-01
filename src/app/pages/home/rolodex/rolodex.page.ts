import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from './../../../services/user/user.service';
import { CardService, Card } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-rolodex',
  templateUrl: './rolodex.page.html',
  styleUrls: ['./rolodex.page.scss'],
})
export class RolodexPage implements OnInit {
  user;
  contactDataList;
  index;
  staticCards: Card[];
  id;

  constructor(private authService: AuthService, private userService: UserService, private cardService: CardService,
    private route: ActivatedRoute, private router: Router
  ) {
    console.log("Rolodex Page (constructor)");

    this.cardService.listStaticCards().subscribe((data) => {
      if (data) {
        this.staticCards = data;
      }
    });
  }

  ngOnInit() {
    console.log("Rolodex Page (init)");
  }


  deleteContact(index) {
    //this.dataService.setContact(this.id, index, false);
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
    //this.user = this.dataService.getUser(this.id);

    // TODO: Page over this data when too large!
    this.contactDataList = [];
    for (let contactId in this.user.contacts) {
      let contactData = {
        id: contactId,
        //name: this.dataService.getUser(contactId).name
      };
      this.contactDataList.push(contactData);
    }
  }
}
