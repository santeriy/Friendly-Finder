import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

showchat: boolean;

  constructor() {}

  async openchat() {
    console.log("showing chat");
    
    if (this.showchat == true) {
      this.showchat = false;
    } else {
      this.showchat = true;
    }
  }
  
}
