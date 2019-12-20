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
      userLogin: new FormControl(),
      password: new FormControl(),
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
    this.signInForm = this.formBuilder.group({
      userLogin: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    })
  }

  get errorControl() {
    return this.signInForm.controls;
  }

}
