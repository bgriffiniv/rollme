import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPage } from './edit.page';

const routes: Routes = [
  {
    path: '',
    component: EditPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPage]
})
export class EditPageModule {}
