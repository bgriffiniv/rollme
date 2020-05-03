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

  async createNewUserDataEntry(currentUser) {
    let newUser = {
      id: currentUser.uid,
      name: this.firstName + ' ' + this.lastName,
      email: this.email
    };
    try {
      this.userService.addUser(newUser);
    } catch (error) {
      console.log('Successful Signup : Create New Card Data', error.message);
    }
  }

  async ngOnInit() {
    console.log('Successful Signup Page init');
    // maybe we can get a whole user?
    try {
      let user = await this.authService.getCurrentUser().toPromise();
      console.log('Successful Signup : Get User Success', user);
      console.log('user uid:' + user.uid + ',\n arg uid:' + this.uid);
      this.createNewUserDataEntry(user);
     } catch(error) {
      console.log('Successful Signup : Get User Failure', error.message);
    }
  }
}
