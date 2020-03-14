import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  id;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    console.log("User Details page (constructor)");
  }

  ngOnInit() {
    console.log("User Details page (init)");

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      console.log("current id: ", this.id);
      this.userService.getUser(this.id, (err, user) => {
        if (err) {
          console.log(err);
        }
        console.log("got user: ", user);
        this.user = user;
      });
    } else {
      this.user.name = "New User";
    }
  }

  ionViewWillEnter() {
    console.log("User Details page (will enter)");

  }

  addUser() {
    this.userService.addUser(this.user, (error, data) => {
      if (error) {
        this.showToast('There was a problem adding your user :(');
      } else {
        this.showToast('User added');
      }

      this.router.navigateByUrl('/users');
    });
  }

  deleteUser() {
    console.log('user id: ' + this.user.id);
    this.userService.deleteUser(this.user, (error, data) => {
      if (error) {
        this.showToast('There was a problem deleting your user :(');
      } else {
        this.showToast('User deleted');
      }
      this.router.navigateByUrl('/users');
    });
  }

  updateUser() {
    this.userService.updateUser(this.user, (error, data) => {
      if (error) {
        this.showToast('There was a problem updating your user :(');
      } else {
        this.showToast('User updated!');
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
