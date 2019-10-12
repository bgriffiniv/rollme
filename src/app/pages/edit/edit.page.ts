import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  dataForm = new FormGroup();
  parent;
  //index;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Edit page started (constructor)");

    if (this.router.getCurrentNavigation().extras.state) {
      let data = this.router.getCurrentNavigation().extras.state.data;
      console.log("data:", data);

      data.forEach(field => {
        this.dataForm.addControl(field.key, new formControl(key.value));
      });

      this.parent = this.router.getCurrentNavigation().extras.state.parent;
      console.log("parent:", this.parent);
      //this.index = this.router.getCurrentNavigation().extras.state.index;
      //console.log("index:", this.index);

    }
  }

  ngOnInit() {
    console.log("Edit page started (init)");
  }

  onSubmit() {
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.dataForm.value//,
        //index: this.index
      }
    };
    this.router.navigate([this.parent], navigationExtras);  }

}
