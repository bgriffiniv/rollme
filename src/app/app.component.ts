import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

  public appPages = [
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Send Feedback',
      url: '/feedback',
      icon: 'text'
    },
    {
      title: 'FAQs',
      url: '/faq',
      icon: 'help-circle'
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
    /*
    {
      title: 'Roll Out',
      url: '/login',
      icon: 'log-out',
    },
    */
    {
      title: 'User List',
      url: '/users',
      icon: 'aperture'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
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
        console.log('Login Page : Sign Out Failure');
      } else {
        console.log('Login Page : Sign Out Success');
      }
      this.router.navigateByUrl('/login');
    });
  }
}
