import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService, Card } from 'src/app/services/card/card.service';

@Component({

  selector: 'app-card-import',
  templateUrl: './card-import.page.html',
  styleUrls: ['./card-import.page.scss'],
})
export class CardImportPage implements OnInit {

  id;
  card: Card;

  isFrontCaptured = false;
  isBackCaptured = false;

  frontImg: string;
  backImg: string;

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
    private route: ActivatedRoute,
    private router: Router,
    private camera: Camera,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    public authService: AuthService,
    private cardService: CardService
  ) {
    console.log('Card Import Start');
  }

  ngOnInit() {
    console.log('Card Import Init');
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      console.log('Current card ID: ', this.id);
      this.cardService.getCard(this.id, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Card: ", data);
          this.card = data;
          this.frontImg = this.card.frontImg;
          this.backImg = this.card.backImg;
        }
      });
    } else {
      console.log('New card');
      this.importCardFront();
    }
  }

  async importCardFront() {
    const alert = await this.alertController.create({
      header: 'Great!',
      subHeader: '',
      message: 'To begin, tap on the first blank card to take a picture of the front side of your business card.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async openCameraFront() {
    await this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.frontImg = base64Image;
      this.isFrontCaptured = true;
      this.importCardBack();
    }, (err) => {
      console.log("Unable to obtain picture: " + err);
    });
  }

  async importCardBack() {
    const alert = await this.alertController.create({
      header: 'Nice!',
      subHeader: '',
      message: "A picture of the front of your card has been imported. Would you like to take one of the back? If not, just click save and you're ready to roll!",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
          this.openCameraBack();
          console.log('Camera launched');
        }
        }, {
          text: 'No',
          handler: () => {
          console.log('Declined import');
          }
        },
      ]
    });
    await alert.present();
  }

  async openCameraBack() {
    await this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.backImg = base64Image;
      this.isBackCaptured = true;
    }, (err) => {
      console.log("Unable to obtain picture: " + err);
    });
  }

  saveCard() {
    console.trace('Saving card');
    this.card = {
      frontImg: this.frontImg,
      backImg: this.backImg || null,
      owner: this.authService.getCurrentUserId(),
      holders: [],
    };

    this.cardService.addCard(this.card, (error, data) => {
      if (error) {
        this.showToast('There was a problem adding your card :(');
      } else {
        this.router.navigateByUrl('/home/profile');
        this.showToast('Card saved!');
      }
    });
  }

  deleteCard() {
    console.trace('Deleting card');
    console.log('Card ID: ', this.id);

    this.cardService.deleteCard(this.id, (error, data) => {
      if (error) {
        this.showToast('There was a problem deleting your card :(');
      } else {
        this.router.navigateByUrl('/home/profile');
        this.showToast('Card deleted');
      }
    });
  }

  async deleteCardAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Are you sure you want to delete this card?',
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
  }

  updateCard() {
    this.cardService.updateCard(this.id, this.card, (error, data) => {
      if (error) {
        this.showToast('There was a problem updating your card :(');
      } else {
        this.router.navigateByUrl('/home/profile');
        this.showToast('Card updated');
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
