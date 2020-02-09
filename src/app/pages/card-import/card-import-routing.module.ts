import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardImportPage } from './card-import.page';

const routes: Routes = [
  {
    path: '',
    component: CardImportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardImportPageRoutingModule {}
