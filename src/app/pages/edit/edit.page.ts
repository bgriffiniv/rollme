import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  dataForm = new FormGroup({});
  parent;
  keys;

  constructor(private route: ActivatedRoute, private router: Router, public toastController: ToastController) {
    console.log("Edit page started (constructor)");

    if (this.router.getCurrentNavigation().extras.state) {
      let data = this.router.getCurrentNavigation().extras.state.data;
      console.log("data:", data);

      this.keys = Object.keys(data);
      this.keys.splice(this.keys.indexOf("contacts"), 1);

      for (let key of this.keys) {
        this.dataForm.addControl(key, new FormControl(data[key]));
      }

      this.parent = this.router.getCurrentNavigation().extras.state.parent;
      console.log("parent:", this.parent);
    }
  }

  ngOnInit() {
    console.log("Edit page started (init)");
  }

  onSubmit() {
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.dataForm.value
      }
    };
    this.router.navigateByUrl('/home/profile');
  }

  async presentToast() {
      const toast = await this.toastController.create({
        message: 'SAVED!',
        duration: 2000
      });
      toast.present();
  }

  async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: '',
        message: '',
        duration: 2000,
        position: 'top',
        buttons: [
          {
            side: 'end',
            icon: 'checkmark-circle',
            text: 'Saved',
            handler: () => {
              console.log('Card saved');
            }
          },
          {
            //text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
      this.router.navigateByUrl('/home/profile');
  }
}
