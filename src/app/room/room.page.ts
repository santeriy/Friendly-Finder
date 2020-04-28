/**
 * Roompage
 * 
 * @ author Santeri Yritys & Joonas Joki
 */

import { Coordinates } from '@ionic-native/geolocation/ngx';
import { MapService } from '../map.service';

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../modals/chat/chat.page';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {


  /// map settings
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
  // map-style
  style = 'mapbox://styles/mooregrimm/ck8pg261v0bpf1jn38qbpwimp';
  // global variables
  showchat: boolean;
  lat: number
  lng: number
  source: any;
  markers: any;
  markercolor = '#f54242';
  items: Array<any> = [];
  joku: any;
  dblat: number;
  dblng: number;
  user: any;
  users: any;
  id: string;
  property: false;

  constructor(private mapService: MapService,
    private nativeStorage: NativeStorage,
    private modalController: ModalController) { }

  coordinates: Coordinates;

  ngOnInit() {
    this.initializeRoomMap()
  }
  // Chat modal
  async openModal(item) {
    const modal = await this.modalController.create({
      component: ChatPage
    })
    return await modal.present();
  }

  private initializeRoomMap() {
    /// locate the user
    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;

      this.buildRoomMap()

    }).catch((error) => {
      console.log(error);
    });
  }

  buildRoomMap() {
    this.map = new mapboxgl.Map({
      container: 'maproom',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    // Read from local storage is user joined the room or made a new room.
    this.nativeStorage.getItem('myitem').then
      ((data) => {
        if (data.property == true) {
          console.log("tulit createroomin kautta.")
          this.myroomUsers()
        } else if (data.property == false) {
          console.log("tulit joinroomin kautta.")
          this.getUsers()
        } else {
          console.log("erroria.", data.property)
        }
      }), error => {
        alert(error);
      };
  }
  // Get users from firebase. This function is used when joining room.
  getUsers() {
    this.mapService.getUsers().subscribe(data => {

      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          geopoint: e.payload.doc.data()['geopoint'],
        };
      })

      // Loop every user from this.user array
      for (let joku of this.user) {

        this.dblat = joku.geopoint.latitude
        this.dblng = joku.geopoint.longitude
        this.id = joku.id;
        // Draw a marker for each user
        this.marker = new mapboxgl.Marker({ "color": this.markercolor })
          .setLngLat([this.dblng, this.dblat])
          .setPopup(new mapboxgl.Popup()//add popups
            .setHTML('<h4>' + this.id + '</h4>'))
          .addTo(this.map)
      }
    });
  }

  // Get myroom users from database. This function is used when creating room.
  myroomUsers() {
    this.mapService.getmyroomLocations().subscribe(data => {
      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          password: e.payload.doc.data()['password'],
          users: e.payload.doc.data()['users'],
        };
      })
      // Loop room from this.user array
      for (let joku of this.user) {
        this.users = joku.users;
      }
      this.mapService.myUser(this.users);
      this.getmyroomLocations()
    });
  }

  // Get myroom user locations. This function is used when creating room.
  getmyroomLocations() {
    this.mapService.getmyUsers().subscribe(data => {
      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          geopoint: e.payload.doc.data()['geopoint'],
        };
      })
      // Loop every user from this.user array
      for (let joku of this.user) {
        this.dblat = joku.geopoint.latitude
        this.dblng = joku.geopoint.longitude
        this.id = joku.id;
        // Draw a marker for each user
        this.marker = new mapboxgl.Marker({ "color": this.markercolor })
          .setLngLat([this.dblng, this.dblat])
          .setPopup(new mapboxgl.Popup()//add popups
            .setHTML('<h4>' + this.id + '</h4>'))
          .addTo(this.map)
      }
    });
  }
}