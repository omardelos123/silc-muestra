import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs//internal/Observable';
import { parametros } from '../parametros';

@Injectable({
  providedIn: 'root'
})
export class ConexionSocketService {


  private url = new parametros().rest_server;
  private socket;


  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
    console.log("Enviando mensaje a socket");
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        console.log("Recibiendo mensaje de socket");
        observer.next(message);
      });
      this.socket.on('confirm-join', (message) => {
        console.log("JOIN CONFIRMADO");
       
      });
    });
  }
  public join(message) {
    this.socket.emit('subscribe', message);
    console.log("Enviando mensaje a socket");
  }

}
