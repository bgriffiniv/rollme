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

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
                  private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    if (this.id) {
      this.userService.getUser(this.id).subscribe(user => {
        this.user = user;
      });
    } else {
      this.user.name = "New User";
    }
  }

  addUser() {
    this.userService.addUser(this.user).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('User added');
    }, err => {
      this.showToast('There was a problem adding your user :(');
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('User deleted');
    }, err => {
      this.showToast('There was a problem deleting your user :(');
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).then(() => {
      this.showToast('User updated');
    }, err => {
      this.showToast('There was a problem updating your user :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
