import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[];

  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string) {
    for (let i = 0; i < this.messages.length; i++) {
      const element = this.messages[i];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
