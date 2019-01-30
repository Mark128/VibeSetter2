import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapPage } from '../pages/Map/map-page';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../providers/location/location';
import { AgmPage } from '../pages/agm/agm';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    MapPage,
    TabsPage,
    AgmPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDVpLKcegpzFv9SH3R2gfgY6WRXqLy5kBo'
    }),
    AgmSnazzyInfoWindowModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    MapPage,
    TabsPage,
    AgmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationService
  ]
})
export class AppModule {}
