import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessfulSignupPageRoutingModule } from './successful-signup-routing.module';

import { SuccessfulSignupPage } from './successful-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessfulSignupPageRoutingModule
  ],
  declarations: [SuccessfulSignupPage]
})
export class SuccessfulSignupPageModule {}
