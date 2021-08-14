import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
} from '@angular/fire/database';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyBOIob9iI9w6ha3y9-UxiP0K9BMkDfvjTg',
  authDomain: 'project-2bc4c.firebaseapp.com',
  databaseURL: 'https://project-2bc4c.firebaseio.com',
  projectId: 'project-2bc4c',
  storageBucket: 'project-2bc4c.appspot.com',
  messagingSenderId: '883514450490',
  appId: '1:883514450490:web:350bd2db69d0c8aa104b03',
  measurementId: 'G-3BYMYWEP07',
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgxGaugeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,

    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
