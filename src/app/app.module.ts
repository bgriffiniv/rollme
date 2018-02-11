import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
//import { * } from 'angularfire2';
import { AddContactPage } from '../pages/add-contact/add-contact';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ProfilePage,
    AddContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ProfilePage,
    AddContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}/*,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyCOwTEY-c9hziBS5gqZoFjEQkn9R_Qmc7g",
      authDomain: "rollme-4308a.firebaseapp.com",
      databaseURL: "https://rollme-4308a.firebaseio.com/",
      storageBucket: "gs://rollme-4308a.appspot.com/",
    })*/
  ]
})
export class AppModule {}
