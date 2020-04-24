import { Coordinates } from '@ionic-native/geolocation/ngx';
import { MapService } from '../map.service';

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../modals/chat/chat.page';

import * as firebase from 'firebase/app'


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  showchat: boolean;
  /// default settings
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  // map-style
  style = 'mapbox://styles/mooregrimm/ck8pg261v0bpf1jn38qbpwimp';
  // marker-color
  lat: number
  lng: number
  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })

  // data
  source: any;
  markers: any;
  markercolor = '#f54242';

  items: Array<any> = [];
  joku: any;
  dblat: number;
  dblng: number;
  user: any;

  constructor(private mapService: MapService,
    private modalController: ModalController) { }

  coordinates: Coordinates;

  ngOnInit() {
    this.initializeRoomMap()
  }

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
    this.getUsers()
  }

  getUsers() {
    this.mapService.getUsers().subscribe(data => {

      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          geopoint: e.payload.doc.data()['geopoint'],
        };
      })
      
      for (let joku of this.user) {

        this.dblat = joku.geopoint.latitude
        this.dblng = joku.geopoint.longitude
        
        this.marker = new mapboxgl.Marker({ "color": this.markercolor })
          .setLngLat([this.dblng, this.dblat])
          .addTo(this.map)
      }
    });
  }

  // getUsers() {
  //   this.mapService.getUsers().subscribe(
  //     data => {
  //       this.items = data;

  //       for (let joku of this.items) {
  //         this.dblat = joku.geopoint.latitude
  //         this.dblng = joku.geopoint.longitude
  //         console.log("tätä",joku)

  //         this.marker = new mapboxgl.Marker({ "color": this.markercolor })
  //           .setLngLat([this.dblng, this.dblat])
  //           .addTo(this.map)
  //       }
  //     }
  //   );
  // }
}