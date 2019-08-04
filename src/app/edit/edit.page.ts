import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Edit page started (constructor)");

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.userForm);
        this.userForm.setValue(this.router.getCurrentNavigation().extras.state.user);
      }
    });
  }

  ngOnInit() {
    console.log("Edit page started (init)");
  }

  onSubmit() {
    console.log(this.userForm.value);
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userForm.value
      }
    };
    this.router.navigate(['profile'], navigationExtras);  }

}
