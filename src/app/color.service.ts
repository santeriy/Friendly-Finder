import { Injectable } from '@angular/core';
import { HomePage } from './home/home.page';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private homePage: HomePage) { }
 
 
}
