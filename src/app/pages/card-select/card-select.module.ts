import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardSelectPageRoutingModule } from './card-select-routing.module';

import { CardSelectPage } from './card-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardSelectPageRoutingModule
  ],
  declarations: [CardSelectPage]
})
export class CardSelectPageModule {}
