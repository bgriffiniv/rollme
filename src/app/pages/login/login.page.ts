import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

export class User {
    email: string;
    password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user:User = new User();

  constructor(private route: ActivatedRoute, private router: Router, public fAuth: AngularFireAuth){
    console.log("LoginPage constructor");
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  async login() {
    console.log("login()", this.user);
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.router.navigateByUrl('/home');
      }

    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
    console.log("LoginPage init");
  }

}
