import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[];
  maxMessageId: number;

  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter();

  constructor(private http: HttpClient) {}

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
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let i = 0; i < this.messages.length; i++) {
      const element = this.messages[i];
      if (Number(element.id) > maxId) {
        maxId = Number(element.id);
      }
    }

    return maxId;
  }

  getMessages() {
    this.http
      .get('https://ng-cms-app-9d43b-default-rtdb.firebaseio.com/messages.json')
      .subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages = this.messages.sort((a: Message, b: Message) => {
            if (a.id < b.id) {
              return -1;
            } else if (a.id > b.id) {
              return 1;
            } else {
              return 0;
            }
          });

          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  storeMessages() {
    const body = JSON.stringify(this.messages.slice());
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .put(
        'https://ng-cms-app-9d43b-default-rtdb.firebaseio.com/messages.json',
        body,
        { headers }
      )
      .subscribe({
        next: () => {
          this.messageChangedEvent.next(this.messages.slice());
        },
      });
  }
}
