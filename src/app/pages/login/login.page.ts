import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.signInForm = new FormGroup({
      "userLogin": new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]{1,10}$'),
        Validators.maxLength(10),
        Validators.minLength(10)
      ])),
      "password": new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    });
  }

  goToHomePage() {
    this.isSubmitted = true;
    if (!this.signInForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.signInForm.value)
    };
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

  get errorControl() {
    return this.signInForm.controls;
  }

}
