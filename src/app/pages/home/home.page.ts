import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

 mobileOrientation: string;
 portraitCardView = true;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService,
              platform: Platform, private screenOrientation: ScreenOrientation, private gyroscope: Gyroscope) {
    console.log("Home page started (constructor)");

    platform.ready().then(() => {
    this.getScreenOrientation();
    }).catch(err => {
      console.log('Error while loading platform', err);
    });
    this.getGyroscopeData();

  }

  ngOnInit() {
    console.log("Home page started (init)");
    // check for a user entry by the uid
    let goToSuccessfulSignupPageIfNoData =

    // get the current user's uid
    this.authService.getCurrentUser((error, currentUser) => {
      if (!currentUser) {
        console.log('Home Page : Currently logged out');
        return;
      }
      this.userService.getUser(currentUser.uid, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
        if (!data) {
          // go to Successful Signup Page if no user exists
          let navigationExtras: NavigationExtras = {
                  state: {
                    uid: currentUser.uid,
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: ''
                  }
                };
          this.router.navigateByUrl('/successful-signup', navigationExtras);
        }
      });
    });
  }


  getScreenOrientation(){
     this.mobileOrientation = this.screenOrientation.type;
     console.log('Orientation is ' + this.mobileOrientation);

     this.screenOrientation.onChange().subscribe(() => {
     this.mobileOrientation = this.screenOrientation.type;
          if (this.mobileOrientation == "portrait-primary") {
              this.portraitCardView = true;
              console.log('Orientation is ' + this.mobileOrientation);

          } else if (this.mobileOrientation == "landscape-primary") {
              this.portraitCardView = false;
              console.log('Orientation is ' + this.mobileOrientation);
          };
     });
  }

  getGyroscopeData() {
     let options: GyroscopeOptions = {
         frequency: 1000
     }

     this.gyroscope.getCurrent(options)
          .then((orientation: GyroscopeOrientation) => {
             console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
          })
     .catch()

     this.gyroscope.watch()
           .subscribe((orientation: GyroscopeOrientation) => {
              console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
           if (orientation.z > 0) {
                this.mobileOrientation == "landscape-primary";
                this.portraitCardView = false;
           }
    });
  }
}
