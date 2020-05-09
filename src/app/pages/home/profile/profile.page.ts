import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService, Card } from 'src/app/services/card/card.service';

import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private ownedCards: Observable<Card[]>;

  id;
  card: Card;
  user;
  keys; // ???

  /*
  frontImg: string; // ???
  backImg: string; // ???
  */

  cameraOptions: CameraOptions = {
    // Some common settings are 20, 50, and 100
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true,
    targetWidth: 658.5,
    targetHeight: 374
  }

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private toastCtrl: ToastController
  ) {
    console.trace('Profile Page Start');
    console.log('Is authenticated: ', this.authService.isAuthenticated()); // FIXME: this should be handled by Home Page
  }

  ngOnInit() {
    console.trace('Profile Page Init');

    /*
    // get any images from card import page... why???
    if (this.router.getCurrentNavigation().extras.state){
      console.info('Get image data from nav extras');
      this.card.frontImg = this.router.getCurrentNavigation().extras.state.cardDataFront;
      this.card.backImg = this.router.getCurrentNavigation().extras.state.cardDataBack;
    };
    */

    // get only owned cards
    let uid = this.authService.getCurrentUserId();
    console.log('Current User ID: ', uid);
    this.ownedCards = this.cardService.listCardsByOwner(uid);

    this.ownedCards.pipe(isEmpty()).subscribe(
      next => {
        console.log('No owned cards');
        this.newCardAlert();
      }
    );
  }

  async createCard() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Create from:',
      buttons: [
        {
          text: 'Photo',
          icon: 'images',
          handler: () => {
            this.router.navigateByUrl('/card-import');
            console.log('Card import page loaded');
          }
        }, {
          text: 'Template',
          icon: 'easel',
          handler: () => {
            this.router.navigateByUrl('/edit');
            console.log('Template card page loaded');
          }
        }, {
          text: 'New',
          icon: 'card',
          handler: () => {
            this.router.navigateByUrl('/user');
            console.log('User list page loaded');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async newCardAlert() {
    const alert = await this.alertController.create({
      header: 'Welcome!',
      subHeader: '',
      message: 'You currently have no cards saved. Click on the card template to create one now!',
      buttons: ['OK']
    });
    await alert.present();
  }

  deleteCard() {
    console.log('Card ID: ' + this.card.id);
    this.cardService.deleteCard(this.card.id).then(() => {
      this.router.navigateByUrl('/profile');
      this.showToast('Card deleted');
    }, err => {
      this.showToast('There was a problem deleting your card :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'success',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle',
          handler: () => {
            console.log('Card saved');
          }
        },
        {
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(toast => toast.present());
  }
}
