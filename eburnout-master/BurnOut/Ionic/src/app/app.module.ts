// Es como el import de JAVA
// Todos los que empiezan con arroba estan en modules
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GlobalProvider } from '../providers/global/global';
import { DatabaseProvider } from '../providers/database/database';
import { FitBitServiceProvider } from '../providers/fit-bit-service/fit-bit-service';
import { NgxEchartsModule } from 'ngx-echarts';

import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';


export const firebaseConfig = {
  apiKey: "AIzaSyA0mnZssyqo5PieFUUBTipdU9VB9uh0Xvo",
  authDomain: "my-first-project-7d187.firebaseapp.com",
  databaseURL: "https://my-first-project-7d187.firebaseio.com",
  projectId: "my-first-project-7d187",
  storageBucket: "my-first-project-7d187.appspot.com",
  messagingSenderId: "323245343363"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      tabsHideOnSubPages: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      preloadModules: true
    }),
    HttpModule,
    HttpClientModule,
    NgxEchartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    GlobalProvider,
    DatabaseProvider,
    FitBitServiceProvider,
    SQLite
  ]
})
export class AppModule { }
