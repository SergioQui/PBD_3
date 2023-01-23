import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Ng2PlayRoutingModule } from './app-routing.module';


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
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    Ng2PlayRoutingModule,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [DatabaseService,AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
