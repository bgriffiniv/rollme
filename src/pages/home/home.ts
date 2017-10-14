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
    this.name = {first:'Burnest', last:'Griffin IV'};
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
}
