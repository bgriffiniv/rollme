import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';

import { tap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  id;
  user: User = {
    name: '',
    bio: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
                  private toastCtrl: ToastController, private router: Router) {
    console.log("User Details page (constructor)");
  }

  ngOnInit() {
    console.log("User Details page (init)");
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      console.log("current id: ", this.id);
      this.userService.getStaticUser(this.id).pipe(
        tap(
          user => {
            console.log("got user: ", user);
            this.user = user;
          },
          err => {
            if (err) {
              console.log(err);
            }
            return null;
          }
        )
      ).subscribe();
    } else {
      this.user.name = "New User";
    }
  }

  ionViewWillEnter() {
    console.log("User Details page (will enter)");
  }

  addUser() {
    this.userService.addStaticUser(this.user)
    .then(data => {
      this.showToast('User added!');
      this.router.navigateByUrl('/users');
    })
    .catch(error => {
      if (error) {
        this.showToast('There was a problem adding your user :(');
      }
      this.router.navigateByUrl('/users');
    });
  }

  deleteUser() {
    console.log('user id: ' + this.user.id);
    this.userService.deleteStaticUser(this.user)
    .then(data => {
      this.showToast('User deleted');
      this.router.navigateByUrl('/users');
    })
    .catch(error => {
      if (error) {
        this.showToast('There was a problem deleting your user :(');
      }
      this.router.navigateByUrl('/users');
    });
  }

  updateUser() {
    this.userService.updateStaticUser(this.user)
    .then(data => {
      this.showToast('User updated!');
      this.router.navigateByUrl('/users');
    })
    .catch(error => {
      if (error) {
        this.showToast('There was a problem updating your user :(');
      }
      this.router.navigateByUrl('/users');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
