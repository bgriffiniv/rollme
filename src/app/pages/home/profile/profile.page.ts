import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { DataService } from './../../../services/data/data.service';
import { UserService, User } from './../../../services/user/user.service';

import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private users: Observable<User[]>;

  capturedCardImgFront: string;
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

   user;
   keys;
   id;

  constructor(private dataService: DataService, private userService: UserService, private route: ActivatedRoute, private router: Router, private camera: Camera, public actionSheetController: ActionSheetController) {
    //console.log("Profile page started (constructor)");

    //this.id = this.userService.getUser();

    //this.route.data.subscribe((data) => {
      //if (this.router.getCurrentNavigation().extras.state) {
        //let updated = this.router.getCurrentNavigation().extras.state.data;
        //this.dataService.setUser(this.id, updated);
      //}

      //this.user = this.dataService.getUser(this.id);
      //this.keys = Object.keys(this.user);
      //this.keys.splice(this.keys.indexOf("contacts"), 1);
    //});
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
            console.log('Loading template card');
          }
        }, {
          text: 'New',
          icon: 'card',
          handler: () => {
            console.log('Loading new card');
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


  ngOnInit() {
    console.log("User List page started (init)");
    this.users = this.userService.getUsers();
    if (this.router.getCurrentNavigation().extras.state){
         this.capturedCardImgFront = this.router.getCurrentNavigation().extras.state.data;
    };
    this.isFrontCaptured = true;
  }

}
