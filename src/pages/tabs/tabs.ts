import { Component } from "@angular/core";
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any;

    constructor() {
      this.tab1Root = HomePage;
    }


}
