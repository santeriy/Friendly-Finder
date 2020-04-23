import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { MapService } from 'src/app/map.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  private URL: string;
  imageURL: any;
  sub: any;
  room: any;
  items: Array<any> = [];
  copyItems = [];
  username: string;
  password: string;
  roomname: string;
  lat: number
  lng: number

  coordinates: Coordinates;


  constructor(private modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private menu: MenuController,
    private mapService: MapService) { }

  async closeModal() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    this.getRooms()
    // this.initializeItems();
  }

  // initializeItems(){
  //   this.items = this.copyItems;
  //   }

  //   getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();

  //   // set val to the value of the searchbar
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //       this.items = this.items.filter((item) => {
  //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);      
  //   })
  //   }
  //   }

  getRooms() {
    this.mapService.getRooms().subscribe(data => {

      this.room = data.map(e => {

        return {
          id: e.payload.doc.id,
          isEdit: false,
          password: e.payload.doc.data()['password'],
          users: e.payload.doc.data()['users'],
        };

      })
      for (let i = 0; i < this.room.length; i++) {
        this.copyItems.push(this.room[i])
      }
    });
  }

  openEnd() {
    this.menu.close();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Wrong password',
      cssClass: 'alert',
      subHeader: 'Try again',
      mode: 'ios',
      buttons: [{
        text: 'OK',
      }],

    });

    await alert.present();
  }

  async joinroom(room) {


    this.mapService.currentRoom = room;
    console.log("santeri", room)
    const alert = await this.alertController.create({
      header: room.id,
      cssClass: 'wrong',
      mode: 'ios',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Join room',
          handler: data => {

            if (data.password == room.password) {
              console.log("Salasana on oikein")
              this.router.navigateByUrl('/room');
              this.closeModal();
              this.openEnd();
              this.getLocation()
              this.mapService.userName(data.username);
              let username = data.username;
              this.UpdateRoom(username)
            }

            else {
              this.showAlert();
              console.log("salasana on väärin");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  getLocation() {
    /// locate the user

    this.mapService.getLocation().then(data => {
      this.coordinates = data.coords;
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      this.CreateUser()
    }).catch((error) => {
      console.log(error);
    });

  }

  CreateUser() {

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

  UpdateRoom(username) {

    // this.mapService.roomName(this.roomname);

    let array = this.mapService.currentRoom.users
    array.push(username)

    let room = {};
    room['password'] = this.mapService.currentRoom.password
    room['users'] = array

    this.mapService.add_Room(room)
  }
}

