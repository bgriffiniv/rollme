import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {AboutPage} from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  name: any;
  users: any;
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
  goToOtherPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(OtherPage);
  }



}
  @Component({
    template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Other Page</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>I'm the other page!</ion-content>`
  })
 export class OtherPage {}
