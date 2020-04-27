import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapService } from '../../map.service';
import { ChatService } from '../../chat.service';

//Theme change service and memory
import { ThemeService } from '../../theme.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  private URL: string;
  imageURL: any;
  sub: any;
  room: any;
  copyItems = [];
  chat: any;

  username: string;
  roomname: string;
  datetime: string;

  // for reading
  messages: any;

  // for writing
  msginput: string = "";

  constructor(private mapService: MapService, 
    private chatService: ChatService, 
    private modalController: ModalController,
    private theme: ThemeService,
    private storage: Storage) { }

  async closeModal() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    this.getChats()
  }

  getChats() {

    this.chatService.getChats().subscribe(data => {
      
      this.chat = data.map(e => {
        console.log("jees",data);
        return {
          id: e.payload.doc.id,
          isEdit: false,
          message: e.payload.doc.data()['message'],
          username: e.payload.doc.data()['username'],
          
        };
      })
      console.log(this.chat);
 
    });
  }

  private send() {

    if (this.msginput !== "") {
      this.username = this.mapService.username;
      this.roomname = this.mapService.roomname;
      this.datetime = new Date().toISOString();

      let msgdata = {};
      msgdata['messages'] = {datetime:[this.datetime], message:[this.msginput], username:[this.username]};

      this.chatService.create_NewChat(msgdata).then(resp => {

        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });

      console.log("sending " + this.msginput);
      this.msginput = "";
    }
    else {
      console.log("no input");
    }
  }

}
