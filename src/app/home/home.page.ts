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
  colorcode: any;
  lat: number
  lng: number



  // data
  source: any;
  markers: any;
  markercolor: any;
  value: any;

  constructor(private mapService: MapService,
    private modalController: ModalController) {
  }

  coordinates: Coordinates;

  ngOnInit() {
    this.initializeMap()
    console.log(this.mapService.markercolor)

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

      this.mapService.markercolor = this.colorcode;

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
    this.marker = new mapboxgl.Marker({ "color": this.mapService.markercolor })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  markerColor() {
    this.marker.remove(this.marker);
    this.marker = new mapboxgl.Marker({ "color": this.mapService.markercolor })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
    console.log("nyt ", this.mapService.markercolor)
  }
}
