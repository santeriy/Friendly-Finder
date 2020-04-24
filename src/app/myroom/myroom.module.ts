import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyroomPageRoutingModule } from './myroom-routing.module';

import { MyroomPage } from './myroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyroomPageRoutingModule
  ],
  declarations: [MyroomPage]
})
export class MyroomPageModule {}
