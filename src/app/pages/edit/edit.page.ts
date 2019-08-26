import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  userForm = new FormGroup({
    name: new FormControl(''),
    company: new FormControl(''),
    role: new FormControl('')
  });
  parent;
  index;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Edit page started (constructor)");

    if (this.router.getCurrentNavigation().extras.state) {
      this.userForm.setValue(this.router.getCurrentNavigation().extras.state.user);
      console.log("user:", this.userForm.value);
      this.parent = this.router.getCurrentNavigation().extras.state.parent;
      console.log("parent:", this.parent);
      this.index = this.router.getCurrentNavigation().extras.state.index;
      console.log("index:", this.index);

    }
  }

  ngOnInit() {
    console.log("Edit page started (init)");
  }

  onSubmit() {
    console.log("updated user:", this.userForm.value);
    console.log("index:", this.index);
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userForm.value,
        index: this.index
      }
    };
    this.router.navigate([this.parent], navigationExtras);  }

}
