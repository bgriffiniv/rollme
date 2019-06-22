import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public name = new FormControl('Jamal Black');

  constructor(private router: Router) {
    console.log("Edit page started (constructor)");
  }

  ngOnInit() {
    console.log("Edit page started (init)");
  }

  goToProfilePage() {

      this.router.navigate(['profile']);
  }

}
