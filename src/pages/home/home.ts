import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, NavParams, NavController } from 'ionic-angular';
import { CardEditorPage } from '../cardeditor/cardeditor';
import { LottieAnimationViewModule } from 'ng-lottie';
import { Splash } from '../splash/splash';


import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataProvider]
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
  contacts: {name: string, company: string}[] = [];
  userData: any = '';

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(public navCtrl: NavController, menuCtrl: MenuController, data: DataProvider, navParams: NavParams) {
    LottieAnimationViewModule.forRoot();

    this.lottieConfig = {
      container: document.getElementById('exampleAnim'),
      path: 'assets/animations/RollMe_Logo_NoBG.json',
      autoplay: true,
      loop: true
    };


    console.log('Hello Home Page');
    menuCtrl.enable(true);

    data.init();

    // if no uid, for any reason, show static users
    data.root.child('/static/contacts')
    .on('value', (staticContacts) => {
      console.log('getting static contacts');

      if ( staticContacts.exists() ) {
        console.log('adding static contacts');
        staticContacts.forEach((staticContact) => {
          let staticContactValue = staticContact.val();
          this.contacts.push({
            name: staticContactValue.name,
            company: staticContactValue.company
          });
        });
      } else {
        console.log('no static contacts');
        data.root.child('/static/contacts/su00').set({
          company: 'Static Company 00',
          name: 'Static User 00',
        });
      }
    }, this.handleError);

    // if there is a uid, check for contacts
    if ( navParams.get('uid') ) {
      data.root.child('/users/' + navParams.get('uid'))
      .on('value', (currentUserData) => {
        console.log('getting user data');

        if ( navParams.get('uid') && currentUserData.exists() ) {
          console.log('adding user data');
          this.userData = JSON.stringify(currentUserData);
        } else {
          console.log('no user data');
          data.root.child('/users/' + navParams.get('uid')).set({
            company: 'Company A0',
            name: 'User A0',
            contacts:[]
          });
        }
      }, this.handleError);
    }

    console.log('Home finished loading');
  }

  handleError(err) {
    console.log("Home Error: " + err.message);
  }

  moveToCardEditorPage() {
    this.navCtrl.push(CardEditorPage);
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  };

  stop() {
    this.anim.stop();
  };

  play() {
    this.anim.play();
  };

  pause() {
    this.anim.pause();
  };

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  };
}
