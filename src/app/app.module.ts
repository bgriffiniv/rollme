import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExpensesPage } from '../pages/expenses/expenses';
import { TabsPage } from '../pages/tabs/tabs';
import { DataServiceProvider } from '../providers/data-service/data-service';
//import { AfProvider } from "../providers/af/af";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExpensesPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExpensesPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    //AfProvider
  ]
})
export class AppModule {}
