import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {

  expenses: {by: string, label: string, cost: number}[];
  email: string;
  label: string;
  cost: number;

  constructor(public navCtrl: NavController) {
    this.expenses = [{
      by : 'hello@example.com',
      label : 'random',
      cost : 10
    }];

    this.cost = 0;
  }

  getTotal() {
    let rtnTotal = 0;
    for (let i = 0; i < this.expenses.length; i++) {
        rtnTotal += this.expenses[i].cost;
    }
    return rtnTotal;
  }

  addExpense() {
    this.expenses.push({
        by: this.email,
        label: this.label,
        cost: this.cost
    });
    this.email = '';
    this.label = '';
    this.cost = 0;
  }
}
