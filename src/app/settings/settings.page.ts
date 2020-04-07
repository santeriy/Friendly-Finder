import { Component} from '@angular/core';
import { MapService } from '../map.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage {

  markercolor: string

  constructor(private mapService: MapService,
    private homePage: HomePage) { }

  save() {
    this.mapService.color(this.markercolor);
  }
}
