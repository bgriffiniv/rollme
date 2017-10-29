import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: { name: String, company: String, role: String };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.user = navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
