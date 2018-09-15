import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ExpensesPage } from '../pages/expenses/expenses';
import { CardEditorPage } from '../pages/cardeditor/cardeditor';
import { Splash } from '../pages/splash/splash';


import { DataProvider } from '../providers/data/data';
import { WindowProvider } from '../providers/window/window';

import { Component } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';

import {LinkedIn} from '@ionic-native/linkedin'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExpensesPage,
    LoginPage,
    CardEditorPage,
    Splash

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LottieAnimationViewModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExpensesPage,
    LoginPage,
    CardEditorPage,
    Splash
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    WindowProvider,
    LinkedIn
  ]
})
export class AppModule {}
