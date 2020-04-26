import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

import * as firebase from 'firebase/app'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { NativeStorage } from '@ionic-native/native-storage/ngx';




@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {

  username: string;
  password: string;
  roomname: string;
  lat: number
  lng: number
  formlogin: FormGroup;
  coordinates: Coordinates;

  constructor(private mapService: MapService,
    private nativeStorage: NativeStorage,
    public formBuilder: FormBuilder,
    public router: Router, ) {
    this.formlogin = this.formBuilder.group({
      user: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.required
      ])),
      room: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(4),
        Validators.required
      ])),
      pass: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(4),
        Validators.required
      ]))
    });
  }

  click() {

    let me = this;
    if (me.formlogin.valid) {

      this.router.navigate(['/room']);
      this.getLocation()

      this.nativeStorage.setItem('myitem', { property: true})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );

      this.mapService.myRoom = this.roomname

    } else {
      alert('empty fields');
    }
  }

  getLocation() {
    /// locate the user

    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;

      this.CreateUser()
      this.CreateRoom()
    }).catch((error) => {
      console.log(error);
    });
  }


  CreateUser() {

    this.mapService.userName(this.username);

    let userdata = {};
    userdata['geopoint'] = new firebase.firestore.GeoPoint(this.lat, this.lng)

    this.mapService.create_NewUser(userdata).then(resp => {
      this.lat = undefined;
      this.lng = undefined;
      this.username = undefined;

      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  CreateRoom() {

    this.mapService.roomName(this.roomname);

    let roomdata = {};
    roomdata['password'] = this.password;
    roomdata['users'] = [this.username]

    this.mapService.create_NewRoom(roomdata).then(resp => {

      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}