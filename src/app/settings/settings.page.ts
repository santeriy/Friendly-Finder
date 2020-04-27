import { Component } from '@angular/core';
import { MapService } from '../map.service';
import { HomePage } from '../home/home.page';

//Theme change and memory
import { ThemeService } from '../theme.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage {

  markercolor: string
  maptheme: any

  constructor(private mapService: MapService,
    private homePage: HomePage,
    private theme: ThemeService,
    private storage: Storage) { }


  changeTheme(name) {
    this.theme.setTheme(themes[name]);
  }

  click() {
    this.storage.set('maptheme', this.maptheme);
    console.log("juu",this.maptheme)
  }

}

const themes = {
  default: {
    primary: '#3880ff',
    secondary: '#595959',
    tertiary: '#7044ff',
    success: '#10dc60',
    warning: '#ffce99',
    danger: '#f04141',
    dark: '#222428',
    medium: '#989aa2',
    light: '#f4f5f8'
  },

  nightmode: {
    primary: '#000066',
    secondary: '#595959',
    tertiary: '#FE5F55',
    success: '#006600',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#262626'

  }

};