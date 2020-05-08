import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardRollPage } from './card-roll.page';

const routes: Routes = [
  {
    path: '',
    component: CardRollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRollPageRoutingModule {}
