import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
      path:'',
      component: HomePage,
      children: [
        {
          path:'rolodex', loadChildren:'./rolodex/rolodex.module#RolodexPageModule'
        },

        {
          path:'exchange', loadChildren:'./exchange/exchange.module#ExchangePageModule'
        },

        {
          path:'profile', loadChildren:'./profile/profile.module#ProfilePageModule'
        },

        {
          path: '',
          redirectTo: 'rolodex',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
imports: [
RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

