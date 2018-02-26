import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataProvider]
})
export class HomePage {

  public contacts: {id: string, name: string, company: string}[];

  constructor(public navCtrl: NavController, data: DataProvider) {
    console.log('Hello Home Page');

    // connect to db
    data.init();

    // user auth

    // pull contacts for user

    this.contacts = [];
    data.root.child('users').once('value', data => {
      let values = data.val();
      let keys = Object.keys(values);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = values[key];
        this.contacts.push({
          id: key,
          name: value.name,
          company: value.company
        });
      }
    });
  }
}
