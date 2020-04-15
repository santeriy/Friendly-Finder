import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFirestore } from '@angular/fire/firestore';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private geolocation: Geolocation,
    private db: AngularFirestore) {

    mapboxgl.accessToken = environment.mapbox.accessToken

  }
  
  getUsers() { 
    return this.db.collection('users').valueChanges();
  }

  create_NewUser(userdata) {
    return this.db.collection('users').add(userdata);
  }

 //map things
  public getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  public watchPosition() {
    return this.geolocation.watchPosition();
  }
}