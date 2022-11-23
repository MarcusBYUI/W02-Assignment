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

  sortAndSend() {
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
    if (!message) {
      return;
    }
    message.id = '';
    this.messages.push(message);
    this.storeMessages(message);
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
    this.http.get('http://localhost:3000/messages').subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.sortAndSend();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  storeMessages(message: Message) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .post<{ message: string; document: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers }
      )
      .subscribe({
        next: () => {
          this.sortAndSend();
        },
      });
  }
}
