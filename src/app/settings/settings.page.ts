import { Component} from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage {

  markercolor: string

  constructor(private mapService: MapService) { }


    
  save() {
    this.mapService.color(this.markercolor);
  }
}
