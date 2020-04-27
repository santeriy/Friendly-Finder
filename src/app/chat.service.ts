import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  roomname: string;
  username: string;

  constructor(private mapService: MapService, private db: AngularFirestore) { }

  public roomName(value) {
    this.roomname = value;
  }

  public userName(value) {
    this.username = value;
  }

  getChats() { 
    console.log("juu", this.mapService.currentRoom)
    return this.db.collection('chat').snapshotChanges();
  }

  create_NewChat(msgdata) {
    return this.db.collection('chat').doc(this.mapService.currentRoom.id).update(msgdata);
  }

}
