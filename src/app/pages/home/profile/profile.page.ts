import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { DataService } from './../../../services/data/data.service';
import { UserService } from './../../../services/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  keys;
  id;

  capturedCardImg: string;

  cameraOptions: CameraOptions = {
    // Some common settings are 20, 50, and 100
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  }

  constructor(private dataService: DataService, private userService: UserService, private route: ActivatedRoute, private router: Router, private camera: Camera) {
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

  openCamera() {
      this.camera.getPicture(this.cameraOptions).then((imageData) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.capturedCardImg = base64Image;
      }, (err) => {
        console.log("Unable to obtain picture: " + err);
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

  ngOnInit() {
  }

}
