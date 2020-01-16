import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardImportPageRoutingModule } from './card-import-routing.module';

import { CardImportPage } from './card-import.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardImportPageRoutingModule
  ],
  declarations: [CardImportPage]
})
export class CardImportPageModule {}
