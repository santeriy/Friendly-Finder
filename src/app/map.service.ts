import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private geolocation: Geolocation) { 

    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  public getLocation(){
    return this.geolocation.getCurrentPosition();
  }

  public watchPosition(){
    return this.geolocation.watchPosition();
  } 
}