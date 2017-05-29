import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RolodexPage } from '../pages/rolodex/rolodex';
import { ContactPage } from '../pages/contact/contact';
import { PersonOnePage } from '../pages/person-one/person-one';
import { PersonTwoPage } from '../pages/person-two/person-two';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    RolodexPage,
    ContactPage,
    PersonOnePage,
    PersonTwoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RolodexPage,
    ContactPage,
    PersonOnePage,
    PersonTwoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}