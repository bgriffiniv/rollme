import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  signupForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.signupForm = new FormGroup({
      signupMethod: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      password: new FormControl(),
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
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.signupForm.value)
    }
  }

}
