import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { MapService } from 'src/app/map.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  

  constructor(private modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private menu: MenuController,
    private mapService: MapService) {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  ngOnInit() {

    this.getRooms()

  }

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
      console.log(this.room)
    });
  }

  openEnd() {
    this.menu.close();
  }

  async showAlert(){
    const alert = await this.alertController.create({
      header: 'Wrong password',
      cssClass: 'alert',
      subHeader: 'Try again',
      mode:'ios',
      buttons: [{
        text: 'OK',
      }],
      
    });

    await alert.present();
  }

  async joinroom(room) {
    
    this.mapService.currentRoom = room;
    console.log("santeri",room)
    const alert = await this.alertController.create({
      header: room.id,
      cssClass: 'wrong',
      mode:'ios',
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
}

