import { Coordinates } from '@ionic-native/geolocation/ngx';
import { MapService } from '../map.service';

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';

//Theme change service and memory
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';

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

  style: any;
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
    private theme: ThemeService,
    private storage: Storage) {
  }

  coordinates: Coordinates;

  ngOnInit() {

    this.initializeMap()
  }

  private initializeMap() {
    /// locate the user

    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;

      this.buildMap()
      // this.Createuserdata()

    }).catch((error) => {
      console.log(error);
    });
  }

  buildMap() {

    this.storage.get('maptheme').then(maptheme => {

      if (maptheme == null) {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/n8rajo00/ck8oezis73ity1iodrz1xt8jt',
          zoom: 13,
          center: [this.lng, this.lat]
        });
      } else {
        console.log("löytyi muuta")

        this.map = new mapboxgl.Map({
          container: 'map',
          style: maptheme,
          zoom: 13,
          center: [this.lng, this.lat]
        });
      }

      /// Add map controls
      this.map.addControl(new mapboxgl.NavigationControl());

      /// Geolocate Control
      this.map.addControl(
        this.geolocate
      );
      this.triggerLocation()
    });
  }

  triggerLocation() {
    setTimeout(() => {
      this.geolocate.trigger()
    }, 50);

    // this.getUsers()
  }

  // getUsers() {
  //   this.mapService.getUsers().subscribe(
  //     data => {
  //       this.items = data;
  //       console.log("ollaan homepage.ts", this.items)

  //       for (let joku of this.items) {
  //         this.dblat = joku.latitude
  //         this.dblng = joku.longitude

  //         this.marker = new mapboxgl.Marker({ "color": this.markercolor })
  //           .setLngLat([this.dblng, this.dblat])
  //           .addTo(this.map)
  //       }
  //     }
  //   );
  // }

  // Createuserdata() {

  //   let userdata = {};
  //   userdata['latitude'] = this.lat;
  //   userdata['longitude'] = this.lng;

  //   this.mapService.create_NewUser(userdata).then(resp => {
  //     this.lat = undefined;
  //     this.lng = undefined;
  //     console.log(resp);
  //   })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
}
