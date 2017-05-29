import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page4Page } from '../page4/page4';
import { Page6Page } from '../page6/page6';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1Page {

  constructor(public navCtrl: NavController) {
  }
  goToPage4(params){
    if (!params) params = {};
    this.navCtrl.push(Page4Page);
  }goToPage6(params){
    if (!params) params = {};
    this.navCtrl.push(Page6Page);
  }
}
