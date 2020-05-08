import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardRollPageRoutingModule } from './card-roll-routing.module';

import { CardRollPage } from './card-roll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardRollPageRoutingModule
  ],
  declarations: [CardRollPage]
})
export class CardRollPageModule {}
