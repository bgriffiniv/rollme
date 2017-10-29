import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {AboutPage} from '../about/about';
import {ProfilePage} from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  name: any;
  users: Array<{ name: String, company: String, role: String }>;
  //aboutPage = AboutPage;

  constructor(public navCtrl: NavController){
    this.users = [
      {
        name: "Emily Smith",
        company: "Company A",
        role: "Sales"
      },
      {
        name: "Rachel Strong",
        company: "Company B",
        role: "CTO"
      },
      {
        name: "Sam Maple",
        company: "Company A",
        role: "Vice President"
      },
      {
        name: "Gary Jones",
        company: "Company C",
        role: "Director"
      }
    ];
  }
  goToProfile(user) {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ProfilePage, {user: user});
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }

}

