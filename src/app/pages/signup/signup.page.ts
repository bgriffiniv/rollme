import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { GoogleAuthService } from './../../services/auth/google-auth.service';
import { LinkedinAuthService } from './../../services/auth/linkedin-auth.service';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild('inputmethods', {static: true}) slider: IonSlides;
  segment = 0;
  signupMethod = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private googleAuthService: GoogleAuthService, private linkedinAuthService: LinkedinAuthService) { }

  submitForm() {

    this.router.navigateByUrl('/create-account');
  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
    console.log('Segment changed', ev);
  }

  async slideChanged(){
    this.segment = await this.slider.getActiveIndex();
    this.signupMethod = await this.slider.getActiveIndex();
  }

  ngOnInit() {
  }

}
