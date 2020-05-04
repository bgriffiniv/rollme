import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;
  // NOTE: flag to suppress validation errors before submission
  isSubmitted = false;

  constructor(private router: Router, public formBuilder: FormBuilder, private authService: AuthService) {
    console.log('Login Page constructor');

    this.signInForm = new FormGroup({
      "username": new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([(]?[0-9]{3}[)]?[. -]?[0-9]{3}[. -]?[0-9]{4})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,})$'),
        Validators.minLength(10)
      ])),
      "password": new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    });
  }

  ngOnInit() {
    console.log('Login Page init');
  }

  signIn() {
    this.isSubmitted = true;
    if (!this.signInForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.signInForm.value)
    };
    this.authService.signIn(this.signInForm.value['username'], this.signInForm.value['password'])
    .then(data => {
      console.log('Login Page : Auth Success : navigating to Home Page');
      this.router.navigateByUrl('/home');
    })
    .catch(error => {
      console.log('Login Page : Sign In Failure : setting error control');
      this.isSubmitted = false;
      this.signInForm.setErrors( { 'signIn' : true } );
    });
  }

  get errorControl() {
    return this.signInForm.controls;
  }

  get formErrors() {
    return this.signInForm.errors;
  }
}
