import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    console.log("Home page started (constructor)");
  }

  ngOnInit() {
    console.log("Home page started (init)")
  }
}
