import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardEditorPage } from './cardeditor';

@NgModule({
  declarations: [
    CardEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(CardEditorPage),
  ],
})
export class CardEditorPageModule {}
