import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AuthService } from './../../../services/auth/auth.service';
import { UserService, User } from './../../../services/user/user.service';
import { CardService, Card } from 'src/app/services/card/card.service';

import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private users: Observable<User[]>;
  private cards: Observable<Card[]>;

  id;
  card: Card = {
    frontImg: ''
  };
  user;
  keys;

  frontImg: string;
  isFrontCaptured = false;

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

  constructor(private authService: AuthService, private userService: UserService, private cardService: CardService, private activatedRoute: ActivatedRoute,
                private router: Router, private camera: Camera, public actionSheetController: ActionSheetController, public alertController: AlertController, private toastCtrl: ToastController) {
    console.log("Profile page started (constructor)");

    //this.id = this.cardService.getCard();

    //this.activatedRoute.data.subscribe((data) => {
      //if (this.router.getCurrentNavigation().extras.state) {
        //let updated = this.router.getCurrentNavigation().extras.state.data;
        //this.cardService.setCard(this.id, updated);
      //}

      //this.card = this.cardService.getCard(this.id);
      //this.keys = Object.keys(this.card);
      //this.keys.splice(this.keys.indexOf("contacts"), 1);
    //});
  }

  ngOnInit() {
    console.log("User List page started (init)");

    if (this.router.getCurrentNavigation().extras.state){
      this.card.frontImg = this.router.getCurrentNavigation().extras.state.data;
    };

    this.cardService.listCards((error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.cards = data;
        this.isFrontCaptured = true;
        this.newCardAlert();
      }
    });
  }

  goToCardImportPage() {
    this.router.navigateByUrl('/card-import');
  }

  goToEditPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.user,
        parent: 'profile'
      }
    };
    this.router.navigateByUrl('/edit');
  }

  goToUserListPage() {
    this.router.navigateByUrl('/user-details');
  }

  async createACard() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Create from:',
      buttons: [{
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
      }]
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

  async deleteCardAlert() {
    const alert = await this.alertController.create({
       header: '',
       subHeader: '',
       message: 'Do you want to delete this card?',
       buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.deleteCard();
          console.log('Card deleted');
        }
      }, {
        text: 'No',
        handler: () => {
          console.log('Card kept');
          }
        },
      ]
    });
    await alert.present();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      console.log("current id: ", this.id);
      this.cardService.getCard(this.id, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log("got card: ", data);
          this.card = data;
        }
      });
    } else {
       this.frontImg = "New Card";
    };
  }

  deleteCard() {
    console.log('card id: ' + this.card.id);
    this.cardService.deleteCard(this.card.id, (error, data) => {
      if (error) {
        this.showToast('There was a problem deleting your card :(');
      } else {
        this.router.navigateByUrl('/profile');
        this.showToast('Card deleted');
      }
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
