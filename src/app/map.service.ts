import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFirestore } from '@angular/fire/firestore';

import * as mapboxgl from 'mapbox-gl';

import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  roomname: string;
  username: string;
  currentRoom: any;
  myRoom: any;
  myusers;


  constructor(private geolocation: Geolocation,
    private db: AngularFirestore) {

    mapboxgl.accessToken = environment.mapbox.accessToken

  }
  /**
     * Get current room users from users collection
     *
     * @param       array     users
     * @return      array (resultset or single row)
     */
  getUsers() { 
    return this.db.collection('/users', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', this.currentRoom.users)).snapshotChanges();
  }

  getmyUsers() { 
    return this.db.collection('/users', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', this.myusers)).snapshotChanges();
  }

  getmyroomLocations() {
    console.log("tänne",this.myRoom)
    return this.db.collection('room/', ref => ref.where(firebase.firestore.FieldPath.documentId(),'==' , this.myRoom)).snapshotChanges();
  }

  create_NewUser(userdata) {
    return this.db.collection('users').doc(this.username).set(userdata);
  }

  add_Room(room){
    return this.db.collection('room').doc(this.currentRoom.id).update(room);
  }

  getRooms() { 
    return this.db.collection('room').snapshotChanges();
  }

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

  public myUser(value) {
    this.myusers = value;
  }
}