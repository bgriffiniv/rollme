import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Home page started (constructor)");
  }

  ngOnInit() {
    console.log("Home page started (init)")
  }
}
