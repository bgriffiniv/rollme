import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {AboutPage} from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;
  cards: any;
  //aboutPage = AboutPage;

  constructor(public navCtrl: NavController){
    this.cards = [
          {
            src: "assets/img/card-saopaolo.png",
            title: "São Paulo",
            subtitle: "41 Listings"
          },{
            src: "assets/img/card-amsterdam.png",
            title: "Amsterdam",
            subtitle: "64 Listings"
          },{
            src: "assets/img/card-sf.png",
            title: "San Francisco",
            subtitle: "72 Listings"
          },{
            src: "assets/img/card-madison.png",
            title: "Madison",
            subtitle: "28 Listings"
          },{
            src: "assets/img/card-portland.png",
            title: "Portland",
            subtitle: "34 Listings"
          }
    ];

    this.name = "Burnest";
  }
}
