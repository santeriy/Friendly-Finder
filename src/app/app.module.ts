import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HomePage } from './home/home.page';
import { SettingsPage } from './settings/settings.page';

// firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RoomPage } from './room/room.page';

//rooms modal
import { RoomsPage } from './modals/rooms/rooms.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

//theme change storage
import { IonicStorageModule } from '@ionic/storage';
import { ThemeService } from './theme.service';

@NgModule({
  declarations: [AppComponent, RoomsPage],
  entryComponents: [RoomsPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HomePage,
    SettingsPage,
    ThemeService,
    RoomPage,
    NativeStorage,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
