import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [DataProvider]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homeTab: HomePage;
  enterTab: LoginPage;
  joinTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, data: DataProvider) {
  }
}
