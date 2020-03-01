import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from './../../../services/user/user.service';
import { CardService } from 'src/app/services/card/card.service';

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

  staticCards;

  constructor(private authService: AuthService, private userService: UserService, private cardService: CardService,
    private route: ActivatedRoute, private router: Router
  ) {
    console.log("Rolodex page started (constructor)");

    //this.id = userService.getUser();

    //this.route.data.subscribe((data) => {
      //if (this.router.getCurrentNavigation().extras.state) {
        //let index = this.router.getCurrentNavigation().extras.state.data;
        //this.dataService.setContact(this.id, index, true);
      //}

      //this.refresh();
    //});
  }

  listStaticCards() {
    return this.cardService.listStaticCards();
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

  ngOnInit() {
  }

}
