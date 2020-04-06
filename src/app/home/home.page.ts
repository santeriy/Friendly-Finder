import { Coordinates } from '@ionic-native/geolocation/ngx';
import { MapService } from '../map.service';


import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


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
  style = 'mapbox://styles/mapbox/dark-v10';
  // marker-color
  colorcode = "#ff00ff"
  lat: number
  lng: number
  
  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService) {
  }

  coordinates: Coordinates;

  ngOnInit() {
    this.initializeMap()
  }

  async openchat() {
    if (this.showchat == true) {
      this.showchat = false;
    } else {
      this.showchat = true;
    }
  }

  private initializeMap() {
    /// locate the user
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
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    // Add marker on map
    this.marker = new mapboxgl.Marker({"color" : this.colorcode})
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  markerColor(colorcode){
    this.marker.remove(this.marker);
    this.colorcode = colorcode;
    console.log(this.colorcode);
    this.marker = new mapboxgl.Marker({"color" : this.colorcode})
    .setLngLat([this.lng, this.lat])
    .addTo(this.map);
  }
  
  mapStyle(style){
    this.style = style;

  }
}
