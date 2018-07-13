import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataProvider]
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
  contacts: {name: string, company: string}[] = [];
  userData: any = '';

  constructor(menuCtrl: MenuController, data: DataProvider, navParams: NavParams) {
    console.log('Hello Home Page');
    menuCtrl.enable(true);

    data.init();

    // if no uid, for any reason, show static users
    data.root.child('/static/contacts')
    .on('value', (staticContacts) => {
      console.log('getting static contacts');

      if ( staticContacts.exists() ) {
        console.log('adding static contacts');
        staticContacts.forEach((staticContact) => {
          let staticContactValue = staticContact.val();
          this.contacts.push({
            name: staticContactValue.name,
            company: staticContactValue.company
          });
        });
      } else {
        console.log('no static contacts');
        data.root.child('/static/contacts/su00').set({
          company: 'Static Company 00',
          name: 'Static User 00',
        });
      }
    }, this.handleError);

    // if there is a uid, check for contacts
    if ( navParams.get('uid') ) {
      data.root.child('/users/' + navParams.get('uid'))
      .on('value', (currentUserData) => {
        console.log('getting user data');

        if ( navParams.get('uid') && currentUserData.exists() ) {
          console.log('adding user data');
          this.userData = JSON.stringify(currentUserData);
        } else {
          console.log('no user data');
          data.root.child('/users/' + navParams.get('uid')).set({
            company: 'Company A0',
            name: 'User A0',
            contacts:[]
          });
        }
      }, this.handleError);
    }

    console.log('Home finished loading');
  }

  handleError(err) {
    console.log("Home Error: " + err.message);
  }
}
