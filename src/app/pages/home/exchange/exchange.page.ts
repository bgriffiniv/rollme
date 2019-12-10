import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {

constructor(private route: ActivatedRoute, private router: Router) { }
  addContact() {
    let navigationExtras: NavigationExtras = {
      state: {
        parent: 'exchange'
      }
    };
    this.router.navigate(['link'], navigationExtras);
  }

  ngOnInit() {
  }

}
