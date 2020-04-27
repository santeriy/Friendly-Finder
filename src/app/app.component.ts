import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { RoomsPage } from './modals/rooms/rooms.page';
import { MapService } from './map.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mapService: MapService,
    public alertController: AlertController,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openEnd() {
    this.menu.close();
  }

  openEndTitle() {
    this.menu.close();
    this.mapService.currentRoom = null;
  }

  exitApp(){
    navigator['app'].exitApp()
 }

 async presentAlertConfirm() {
  const alert = await this.alertController.create({
    message: '<strong>Are you sure you want to quit?</strong>',
    cssClass: 'alerttext',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.exitApp()
        }
      }
    ]
  });

  await alert.present();
}
  // Join room function
  async openModal(item) {
    const modal = await this.modalController.create({
      component: RoomsPage
    })
    return await modal.present();
  }
}
