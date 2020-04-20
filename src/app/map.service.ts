import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFirestore } from '@angular/fire/firestore';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  roomname: string;
  username: string;

  constructor(private geolocation: Geolocation,
    private db: AngularFirestore) {

    mapboxgl.accessToken = environment.mapbox.accessToken

  }
  
  getUsers() { 
    return this.db.collection('users').snapshotChanges();
  }

  create_NewUser(userdata) {
    return this.db.collection('users').doc(this.username).set(userdata);
  }

  // update_User(username,userdata){
  //   this.db.doc('users/' + username).update(userdata);
  //   console.log("map",userdata)
  // }

  create_NewRoom(roomdata) {
    return this.db.collection('room').doc(this.roomname).set(roomdata);
  }

  public getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  public watchPosition() {
    return this.geolocation.watchPosition();
  }

  public roomName(value) {
    this.roomname = value;
  }

  public userName(value) {
    this.username = value;
  }
}