import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-successful-signup',
  templateUrl: './successful-signup.page.html',
  styleUrls: ['./successful-signup.page.scss'],
})
export class SuccessfulSignupPage implements OnInit {

  uid: '';
  firstName: '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    console.log('Successful Signup Page constructor');
    if (this.router.getCurrentNavigation().extras.state){
      this.uid = this.router.getCurrentNavigation().extras.state.data;
    }
  }

  goToRolodexPage() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    console.log('Successful Signup Page init');
    let currentUser = this.authService.getCurrentUser();

    console.log('user uid:' + currentUser.uid + ', arg uid:' + this.uid);
  }

}
