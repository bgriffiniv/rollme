import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonOnePage } from '../person-one/person-one';
import { PersonTwoPage } from '../person-two/person-two';

@Component({
  selector: 'page-rolodex',
  templateUrl: 'rolodex.html'
})
export class RolodexPage {

  constructor(public navCtrl: NavController) {
  }
  goToPersonOne(params){
    if (!params) params = {};
    this.navCtrl.push(PersonOnePage);
  }goToPersonTwo(params){
    if (!params) params = {};
    this.navCtrl.push(PersonTwoPage);
  }
}
