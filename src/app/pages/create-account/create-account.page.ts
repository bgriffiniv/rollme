import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  firstName: string = '';

  signupForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private toastCtrl: ToastController, private authService: AuthService) {
    this.signupForm = new FormGroup({
      signupMethod: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  get errorControl() {
    return this.signupForm.controls;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      signupMethod: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      confirmPassword: ['', Validators.required]
    });
  }

  createAccount() {
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.signupForm.value)
    }
    this.showToast('Account created!');
    err => {
      this.showToast('There was a problem creating your account :(');
    };
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.firstName
      }
    };
    this.router.navigateByUrl('/successful-signup', navigationExtras);
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
