import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfulSignupPage } from './successful-signup.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessfulSignupPageRoutingModule {}
