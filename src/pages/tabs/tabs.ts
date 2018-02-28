import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ExpensesPage } from '../expenses/expenses';

import { DataProvider } from '../../providers/data/data';

@Component({
  templateUrl: 'tabs.html',
  providers: [DataProvider]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homeTab: any;
  enterTab: any;
  expensesTab: any;
  joinTab: any;

  constructor(data: DataProvider) {
    this.joinTab = LoginPage;
    this.enterTab = LoginPage;
    this.homeTab = HomePage;
    this.expensesTab = ExpensesPage;

    data.init();
    console.log(data.auth.currentUser);
  }
}
