import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

export class User {
    email: string;
    password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user:User = new User();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fAuth: AngularFireAuth){
  }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully registered!");
        this.router.navigateByUrl('/login');
      }

    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
  }

}
