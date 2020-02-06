import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [

{
    path:'home',
    component: HomePage,
    children: [
      {
        path:'rolodex',
        children: [
          {
            path:'',
            loadChildren:'./rolodex/rolodex.module#RolodexPageModule'
          }
        ]
      },

      {
        path:'exchange',
        children: [
          {
            path:'',
            loadChildren:'./exchange/exchange.module#ExchangePageModule'
          }
        ]
      },

      {
        path:'profile',
        children: [
          {
            path:'',
            loadChildren:'./profile/profile.module#ProfilePageModule'
          },
          {
            path:'card-import',
            loadChildren: '../card-import/card-import.module#CardImportPageModule'
          }
        ]
      },

      {
        path: '',
        redirectTo: 'rolodex',
        pathMatch: 'full'
      }
    ]
},
  {
    path: '',
    redirectTo: 'rolodex',
    pathMatch: 'full'
  }
];

@NgModule({
imports: [
RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

