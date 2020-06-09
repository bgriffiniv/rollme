import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardSelectPage } from './card-select.page';

const routes: Routes = [
  {
    path: '',
    component: CardSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardSelectPageRoutingModule {}
