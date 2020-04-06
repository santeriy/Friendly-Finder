import { Component, OnInit } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  colorcode = "#ff00ff"
  constructor() { }

  ngOnInit() {
  }

  changeColor(){
    this.colorcode = "e320c9";
    console.log(this.colorcode)
    

  }
}
