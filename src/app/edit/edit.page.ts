import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import {map} from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Edit page started (constructor)");

    if (this.router.getCurrentNavigation().extras.state) {
      this.userForm.setValue(this.router.getCurrentNavigation().extras.state.user);
      console.log(this.userForm);
      this.parent = this.router.getCurrentNavigation().extras.state.user;
    }

    /*
    const data = route.data.pipe(map(d => d));
    console.log("data (pipe):", data);

    this.route.params.subscribe((params) => {
      console.log("params:", params);
    });

    this.route.data.subscribe((data) => {
      console.log("data:", data);
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log("queryParams:", queryParams);
    });
    */
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
    this.router.navigate([this.parent], navigationExtras);  }

}
