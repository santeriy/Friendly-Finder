import { Coordinates } from '@ionic-native/geolocation/ngx';
import { MapService } from '../map.service';

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../modals/chat/chat.page';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  showchat: boolean;
  /// default settings
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  // map-style
  style = 'mapbox://styles/mooregrimm/ck8k40yzs0yz51iocd9pemxhc';
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
  value: any;

  items: Array<any> = [];
  joku: any;
  dblat: number;
  dblng: number;

  constructor(private mapService: MapService,
    private modalController: ModalController) {
  }

  coordinates: Coordinates;

  ngOnInit() {

    this.initializeMap()
  }

  async openModal(item) {
    const modal = await this.modalController.create({
      component: ChatPage
    })
    return await modal.present();
  }


  private initializeMap() {
    /// locate the user

    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;

      this.buildMap()
      this.Createuserdata()

    }).catch((error) => {
      console.log(error);
    });
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    /// Add map controls

    this.map.addControl(new mapboxgl.NavigationControl());

    /// Geolocate Control
    this.map.addControl(
      this.geolocate
    );
    this.triggerLocation()
  }

  triggerLocation() {
    setTimeout(() => {
      this.geolocate.trigger()
    }, 50);

    this.getUsers()
  }

  getUsers() {
    this.mapService.getUsers().subscribe(
      data => {
        this.items = data;
        console.log("ollaan homepage.ts", this.items)

        for (let joku of this.items) {
          this.dblat = joku.latitude
          this.dblng = joku.longitude

          this.marker = new mapboxgl.Marker({ "color": this.markercolor })
            .setLngLat([this.dblng, this.dblat])
            .addTo(this.map)
        }
      }
    );
  }

  Createuserdata() {
    
    let userdata = {};
    userdata['latitude'] = this.lat;
    userdata['longitude'] = this.lng;
  
    this.mapService.create_NewUser(userdata).then(resp => {
      this.lat = undefined;
      this.lng = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}
