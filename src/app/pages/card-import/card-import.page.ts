import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-card-import',
  templateUrl: './card-import.page.html',
  styleUrls: ['./card-import.page.scss'],
})
export class CardImportPage implements OnInit {

  isFrontCaptured = false;
  isBackCaptured = false;

  capturedCardImgFront: string;
  capturedCardImgBack: string;

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

  constructor(private route: ActivatedRoute, private router: Router, private camera: Camera, private toastCtrl: ToastController, public alertController: AlertController) {

  }

  openCameraFront() {
        this.camera.getPicture(this.cameraOptions).then((imageData) => {
          // this.camera.DestinationType.FILE_URI gives file URI saved in local
          // this.camera.DestinationType.DATA_URL gives base64 URI

          let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.capturedCardImgFront = base64Image;
        }, (err) => {
          console.log("Unable to obtain picture: " + err);
        });
        this.isFrontCaptured = true;
        this.importCardBack();

  }

   openCameraBack() {
          this.camera.getPicture(this.cameraOptions).then((imageData) => {
            // this.camera.DestinationType.FILE_URI gives file URI saved in local
            // this.camera.DestinationType.DATA_URL gives base64 URI

            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.capturedCardImgBack = base64Image;
          }, (err) => {
            console.log("Unable to obtain picture: " + err);
          });
          this.isBackCaptured = true;
   }

   saveCard() {
     this.showToast('Card saved!');
     err => {
       this.showToast('There was a problem saving your card :(');
     };
     let navigationExtras: NavigationExtras = {
       state: {
         data: this.capturedCardImgFront
       }
     };
     this.router.navigateByUrl('/home/profile', navigationExtras);
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

   async importCardFront() {
      const alert = await this.alertController.create({
        header: 'Great!',
        subHeader: '',
        message: 'To begin, tap on the first blank card to take a picture of the front side of your business card.',
        buttons: ['OK']
      });

      await alert.present();
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


  ngOnInit() {
    this.importCardFront();
  }

}
