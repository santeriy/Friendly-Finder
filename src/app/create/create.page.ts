import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import * as firebase from 'firebase/app'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

// Theme change service and memory
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {

  //global variables
  username: string;
  password: string;
  roomname: string;
  lat: number
  lng: number
  formlogin: FormGroup;
  coordinates: Coordinates;

  constructor(private mapService: MapService,
    private theme: ThemeService,
    private storage: Storage,
    private nativeStorage: NativeStorage,
    public formBuilder: FormBuilder,
    public router: Router, ) {
    // Form validations
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

  // Function is executed when the Create button is clicked on create.page.html
  click() {
    let me = this;
    // Create room if form validations pass.
    if (me.formlogin.valid) {

      this.router.navigate(['/room']);
      this.getLocation()
      // Sets myitem property to true
      this.nativeStorage.setItem('myitem', { property: true })
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );

      this.mapService.myRoom = this.roomname
      // does not pass validation
    } else {
      alert('Check fields');
    }
  }

  getLocation() {
    // locate the user
    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      // called functions
      this.CreateUser()
      this.CreateRoom()
    }).catch((error) => {
      console.log(error);
    });
  }


  CreateUser() {
    // send username to mapservice function
    this.mapService.userName(this.username);

    // send username information to mapservice function
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
    // send roomname to mapservice function
    this.mapService.roomName(this.roomname);

    // send room information to mapservice function
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