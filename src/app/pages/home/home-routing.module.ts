import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'rolodex',
    pathMatch: 'full'
  },
  {
    path:'rolodex', loadChildren:'./rolodex/rolodex.module#RolodexPageModule'
  },
  {
    path:'exchange', loadChildren:'./exchange/exchange.module#ExchangePageModule'
  },
  {
    path:'profile', loadChildren:'./profile/profile.module#ProfilePageModule'
  },
];

@NgModule({
imports: [
RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

