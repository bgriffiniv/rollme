import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
selector: 'app-profile',
templateUrl: './profile.page.html',
styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

constructor(private router: Router) { }

  goToEditPage() {
    this.router.navigateByUrl('/edit');
  }

  ngOnInit() {
  }

}
