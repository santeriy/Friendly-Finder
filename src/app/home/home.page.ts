import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

showchat: boolean;

  constructor() {}


  // Toggle chat if the chat button is pressed
  async openchat() {
    if (this.showchat == true) {
      this.showchat = false;
    } else {
      this.showchat = true;
    }
  }
  
}
