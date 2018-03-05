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
  contacts: {name: string, company: string}[];
  email: any;
  userData: any;

  constructor(menuCtrl: MenuController, data: DataProvider, navParams: NavParams) {
    console.log('Hello Home Page');
    data.init();
    menuCtrl.enable(true);
    this.contacts = [{name: 'foo', company: 'bar'}];
    this.userData = null;
    data.root.child('/static/contacts')
    .once('value', (data) => {
      console.log('getting contacts');
      if ( data == null ) {
        console.log('no contacts');
      } else {
        console.log('adding contacts');
        data.forEach(function(childData) {
          let value = childData.val();
          try {
          this.contacts.push({
            name: value.name,
            company: value.company
          });

          } catch (err) { console.log(err.message); }
        });
      }
    }, this.handleContactError);

    data.root.child('/users/' + data.auth.currentUser.uid)
    .once('value', (data) => {
      console.log('getting user data');
      if ( data == null ) {
        console.log('no user data');
        data.root.child('/users/' + data.auth.currentUser.uid).set({
            company: 'Company Z',
            name: data.auth.currentUser.email,
            contacts:[]
          });
      } else {
        console.log('adding user data');
        try {
          this.userData = JSON.stringify(data);
        } catch (err) { console.log(err.message); }
      }
    }, this.handleContactError);

    this.email = data.auth.currentUser.email;
    console.log('Home finished loading');
  }

  handleContactError(err) {
    console.log("The read failed: " + err.message);
  }
}
