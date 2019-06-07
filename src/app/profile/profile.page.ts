import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: any;
  constructor() {
    this.user = {
      name : "Burnest Griffin IV",
      company : "IdeaLogic",
      role : "Developer"
    };

    console.log("Profile page started");
  }

  ngOnInit() {
  }

}
