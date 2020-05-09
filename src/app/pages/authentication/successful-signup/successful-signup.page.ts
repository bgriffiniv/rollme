import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-successful-signup',
  templateUrl: './successful-signup.page.html',
  styleUrls: ['./successful-signup.page.scss'],
})
export class SuccessfulSignupPage implements OnInit {

  uid: '';
  firstName: '';
  lastName: '';
  mobile: '';
  email: '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {

    console.log('Successful Signup Page constructor');
    let extras = this.router.getCurrentNavigation().extras;
    if (extras && extras.state){
      let state = extras.state;
      this.uid = state.uid;
      this.firstName = state.firstName;
      this.lastName = state.lastName;
      this.mobile = state.mobile;
      this.email = state.email;
    }
  }

  submit() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    console.log('Successful Signup Page init');
    // maybe we can get a whole user?
    this.authService.getCurrentUser(getCurrentUserCallback);

    var getCurrentUserCallback = (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log('user uid:' + data.uid + ',\n arg uid:' + this.uid);
        // create new user and card entries here?
        let newUser = {
          id: this.uid,
          name: this.firstName + ' ' + this.lastName,
          email: this.email
        };
        this.userService.addUser(newUser, addUserCallback);
      }
    };

    var addUserCallback = (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };
  }
}
