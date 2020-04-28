/**
 * Mapservice
 * 
 * @ author Santeri Yritys & Joonas Joki
 */

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

  //global variables
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
     * @param       array currentRoom.users   Array of currentRoom users
     * @return      array(resultset or single row)
     */
  getUsers() {
    return this.db.collection('/users', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', this.currentRoom.users)).snapshotChanges();
  }

  /**
     * Get current room users for the room creator from users collection
     *
     * @param       array myusers   Array of users
     * @return      array (resultset or single row)
     */
  getmyUsers() {
    return this.db.collection('/users', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', this.myusers)).snapshotChanges();
  }

  /**
   * Get my room from room collection
   * 
   * @param       string  myRoom    roomname
   * @return      array (resultset or single row)
   */
  getmyroomLocations() {
    return this.db.collection('room/', ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', this.myRoom)).snapshotChanges();
  }

  /**
   * Add user to users collection
   *
   * @param       string  this.username    username
   * @param       array userdata    array of userdata
   * @return     boolean
   */
  create_NewUser(userdata) {
    return this.db.collection('users').doc(this.username).set(userdata);
  }

  /**
   * Add room to room collection
   *
   * @param       array room    array of roomdata
   * @param       string  this.currentRoom.id   currentRoom.id    
   * @return     boolean
   */
  add_Room(room) {
    return this.db.collection('room').doc(this.currentRoom.id).update(room);
  }

  /**
   * Get rooms from room collection
   * @param        -
   * @return      array (resultset or single row)
   */
  getRooms() {
    return this.db.collection('room').snapshotChanges();
  }

  /** 
   * add room to room collection
   * @param       array  roomdata    array of roomdata
   * @param       string this.roomname   roomname
   * @return       boolean
   */
  create_NewRoom(roomdata) {
    return this.db.collection('room').doc(this.roomname).set(roomdata);
  }

  /**
   * get coordinates from geolocation
   * @param        -
   * @return      array (resultset or single row)
   */
  public getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  /**
   * get coordinates from geolocation
   * @param        -
   * @return      array (resultset or single row)
   */
  public watchPosition() {
    return this.geolocation.watchPosition();
  }

  // Functions that read values ​​when called from other pages
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
