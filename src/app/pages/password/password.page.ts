import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) {
    this.ionicForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      dob: new FormControl(),
      mobile: new FormControl()
    });
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: [''],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
        onlyself: true
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }


}
