import { Component } from '@angular/core';

import { Platform, AlertController, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  showSplash = true;
  profilePic: string;

  public appPages = [
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    },
    {
      title: 'Send Feedback',
      url: '/feedback',
      icon: 'text'
    },
    {
      title: 'FAQs',
      url: '/faq',
      icon: 'help-circle-outline'
    },
    {
      title: 'Invite',
      url: '/invite',
      icon: 'people'
    },
    {
      title: 'Change Password',
      url: '/password',
      icon: 'lock'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'License',
      url: '/license',
      icon: 'clipboard'
    },
    {
      title: 'User List',
      url: '/users',
      icon: 'aperture'
    }
  ];

  cameraOptions: CameraOptions = {
      // Some common settings are 20, 50, and 100
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      correctOrientation: true,
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       timer(3000).subscribe(() => {  this.showSplash = false;});
    });
  }

  rollout() {
    this.authService.signOut((error, data) => {
      if (error) {
        console.log('Menu : Sign Out Failure');
      } else {
        console.log('Menu : Sign Out Success');
      }
      this.router.navigateByUrl('/login');
    });
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  async takePhoto() {
       await this.camera.getPicture(this.cameraOptions).then((imageData) => {
         // this.camera.DestinationType.FILE_URI gives file URI saved in local
         // this.camera.DestinationType.DATA_URL gives base64 URI

         let base64Image = 'data:image/jpeg;base64,' + imageData;
         this.profilePic = base64Image;
       }, (err) => {
         console.log("Unable to obtain picture: " + err);
       });
  }

  async capturePhoto() {
        const actionSheet = await this.actionSheetController.create({
          buttons: [{
            text: 'Take Photo',
            icon: 'images',
            handler: () => {
              this.router.navigateByUrl('/card-import');
              console.log('Card import page loaded');
            }
          }, {
            text: 'Photo library',
            icon: 'easel',
            handler: () => {
              this.router.navigateByUrl('/edit');
              console.log('Template card page loaded');
            }
          }]
        });
  }
}
