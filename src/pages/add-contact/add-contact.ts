import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html'
})

export class AddContactPage {
  //contactList: FirebaseListObservable<any>;
  contactList: Array<{ name: String, company: String, role: String }>;
  constructor(public navCtrl: NavController, /*public af: AngularFire*/) {
    //this.contactList = af.database.list('/contacts');
    this.contactList = [{name:"Hello", company:"Blah1", role:"Role1"}, {name:"Bye", company:"Blah2", role:"Role2"}];
  }

  addContact(name, address, phone, city) {
/*    this.contactList.push({
      name: name,
      address: address,
      phone: phone,
      city: city
    }).then( newContact => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });*/
    return true;
  }
}
