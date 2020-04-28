/**
 * Homepage
 * 
 * @ author Santeri Yritys & Joonas Joki
 */

import { Coordinates } from '@ionic-native/geolocation/ngx';
import { MapService } from '../map.service';

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

//Theme change service and memory
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  // global variables
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style: any;
  lat: number
  lng: number
  source: any;
  markers: any;
  markercolor = '#f54242';
  value: any;
  items: Array<any> = [];
  dblat: number;
  dblng: number;

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })

  constructor(private mapService: MapService,
    private theme: ThemeService,
    private storage: Storage) {
  }

  coordinates: Coordinates;

  ngOnInit() {
    this.initializeMap()
  }

  // Reloading the map
  reloadPage() {
    window.location.reload()
  }
  // get coordinates
  initializeMap() {
    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;

      this.buildMap()
 
    }).catch((error) => {
      console.log(error);
    });
  }

  buildMap() {
    // Read from local storage whether the user has changed the style of the map.
    this.storage.get('maptheme').then(maptheme => {
      // If localstorage is empty, load the default map.
      if (maptheme == null) {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/n8rajo00/ck8oezis73ity1iodrz1xt8jt',
          zoom: 13,
          center: [this.lng, this.lat]
        });
      } else {
        // If the local storage is not empty. Reads map style from local storage.
        this.map = new mapboxgl.Map({
          container: 'map',
          style: maptheme,
          zoom: 13,
          center: [this.lng, this.lat]
        });
      }
      // Add map controls
      this.map.addControl(new mapboxgl.NavigationControl());

      // Geolocate Control
      this.map.addControl(
        this.geolocate
      );
      // Start tracking location automatically
      this.triggerLocation()
    });
  }

  triggerLocation() {
    setTimeout(() => {
      this.geolocate.trigger()
    }, 50);
  }
}
