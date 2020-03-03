import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaugeModule } from 'angular-gauge';

var firebaseConfig = {
  apiKey: "AIzaSyDXWL_Ca1DFC21ZtSdIeNbMl_hzFu16gno",
  authDomain: "houseiot-10859.firebaseapp.com",
  databaseURL: "https://houseiot-10859.firebaseio.com",
  projectId: "houseiot-10859",
  storageBucket: "houseiot-10859.appspot.com",
  messagingSenderId: "747397293850",
  appId: "1:747397293850:web:b7e67837ceddde4971eea3"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    GaugeModule.forRoot()
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    StatusBar,
    OneSignal,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
