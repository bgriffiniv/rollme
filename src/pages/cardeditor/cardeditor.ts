import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Card Editor page.
 */

@IonicPage()
@Component({
  selector: 'page-cardeditor',
  templateUrl: 'cardeditor.html',
})
export class CardEditorPage{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 moveToHome() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardEditor');
  }

}
