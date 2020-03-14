import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { GoogleAuthService } from './../../services/auth/google-auth.service';
import { LinkedinAuthService } from './../../services/auth/linkedin-auth.service';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild('inputmethods', {static: true}) slider: IonSlides;
  segment = 0;
  signupMethod = "Mobile";

  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private authService: AuthService, private googleAuthService: GoogleAuthService, private linkedinAuthService: LinkedinAuthService) {
    this.registerForm = new FormGroup({
      "mobile": new FormControl('', Validators.compose([
        Validators.pattern('^[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]{1,10}$'),
        Validators.maxLength(10),
        Validators.minLength(10)
      ])),
      "email": new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$')])
    });
  }

  submitForm() {
     this.isSubmitted = true;
     if (!this.registerForm.valid) {
       console.log('Please provide all the required values!')
       return false;
     } else {
        console.log(this.registerForm.value)
     };

     let navigationExtras: NavigationExtras = {
        state: {
          data: this.signupMethod,
          mobile: this.registerForm.value.mobile,
          email: this.registerForm.value.email
        },
     };

     this.router.navigateByUrl('/create-account', navigationExtras);
  }

  get errorControl() {
      return this.registerForm.controls;
  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
    console.log('Segment changed', ev);
  }

  async slideChanged(){
    this.segment = await this.slider.getActiveIndex();
    this.signupMethod = this.segment == 0?"Mobile":"Email";
    console.log('slide changed', this.signupMethod);
  }

  showRedirectURL() {
    this.linkedinAuthService.getRedirectURL()
  }

  ngOnInit() {
  }

}
