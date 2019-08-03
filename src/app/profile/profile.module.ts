import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
//import { EditPage } from '../edit/edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
   path: 'edit',
   loadChildren: '../edit/edit.module#EditPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
