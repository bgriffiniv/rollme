import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';
import { PasswordValidator } from '../../validators/password.validator';

import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  signupMethod: '';

  mobile: '';
  email: '';

  isSubmitted = false;
  signupForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private toastCtrl: ToastController, private authService: AuthService) {
    if (this.router.getCurrentNavigation().extras.state){
          this.signupMethod = this.router.getCurrentNavigation().extras.state.data;
          this.mobile = this.router.getCurrentNavigation().extras.state.mobile;
          this.email = this.router.getCurrentNavigation().extras.state.email;
    }

    this.signupForm = this.formBuilder.group({
         "firstName" : ['', [Validators.required, Validators.minLength(2)]],
         "lastName" : ['', [Validators.required, Validators.minLength(2)]],
         "password" : ['', Validators.compose([
           Validators.minLength(5),
           Validators.required,
           Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
         ])],
         "confirmPassword" : ['', [Validators.required]],
      }, {validator: PasswordValidator});

  }

  get errorControl() {
    return this.signupForm.controls;
  }

  get formErrors() {
    return this.signupForm.errors;
  }

  ngOnInit() {

  }

  createAccount() {
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.signupForm.value)
    }

    this.authService.signUp(this.email, this.signupForm.value.password, signUpCallback);

    var signUpCallback = (error, data) => {
      if (error) {
        console.log('Create Account Page : Sign Up Failure : setting error control: ', error);
        this.isSubmitted = false;
        this.signupForm.setErrors( { 'signUp' : true } );
      } else {
        console.log('Create Account Page : Sign Up Success : navigating to Successful Signup Page');
        this.showToast('Account created!');
        this.authService.getCurrentUser(getCurrentUserCallback);
      }
    };

    var getCurrentUserCallback = (error, data) => {
      if (error) {
        console.log('get current user error: ', error);
      } else {
        console.log('current user: ', data)
        let navigationExtras: NavigationExtras = {
          state: {
            uid: data.uid,
            firstName: this.signupForm.value.firstName,
            lastName: this.signupForm.value.lastName,
            email: this.email,
            mobile: this.mobile
          }
        };
        this.router.navigateByUrl('/successful-signup', navigationExtras);
      }
    };
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'success',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle',
          handler: () => {
            console.log('Account Created');
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
