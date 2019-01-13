import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, ErrorHandler, NgModule, Injectable } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import  * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ExpensesPage } from '../pages/expenses/expenses';
import { CardEditorPage } from '../pages/cardeditor/cardeditor';
import { Splash } from '../pages/splash/splash';

import { DataProvider } from '../providers/data/data';
import { WindowProvider } from '../providers/window/window';

import { LottieAnimationViewModule } from 'ng-lottie';

import { LinkedInManager } from '../providers/social_login/linkedin_manager';
import { FacebookManager } from '../providers/social_login/facebook_manager';
import { GooglePlusManager } from '../providers/social_login/googleplus_manager';

var config = {
    apiKey: "AIzaSyCOwTEY-c9hziBS5gqZoFjEQkn9R_Qmc7g",
    authDomain: "rollme-4308a.firebaseapp.com",
    databaseURL: "https://rollme-4308a.firebaseio.com",
    projectId: "rollme-4308a",
    storageBucket: "rollme-4308a.appspot.com",
    messagingSenderId: "768651667072"
  };
  firebase.initializeApp(config);

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
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    LottieAnimationViewModule.forRoot(),
    HttpClientModule
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
    forwardRef(() => LinkedInManager),
    forwardRef(() => FacebookManager),
    forwardRef(() => GooglePlusManager)
  ]
})
export class AppModule {}
