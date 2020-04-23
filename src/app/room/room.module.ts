import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { ChatPage } from '../modals/chat/chat.page';

@NgModule({
  declarations: [RoomPage, ChatPage],
  entryComponents: [ChatPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule
  ]
  
})
export class RoomPageModule {}
