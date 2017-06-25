import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonOnePage } from '../person-one/person-one';
import { PersonTwoPage } from '../person-two/person-two';
import {sum} from 'lodash'
import {schemaForm} from 'angular-schema-form'

@Component({
  selector: 'page-rolodex',
  templateUrl: 'rolodex.html'
})
export class RolodexPage {

  constructor(public navCtrl: NavController) {
        console.log(sum)
        console.log(schemaForm)
  }
  goToPersonOne(params){
    if (!params) params = {};
    this.navCtrl.push(PersonOnePage);
  }goToPersonTwo(params){
    if (!params) params = {};
    this.navCtrl.push(PersonTwoPage);
  }
}
