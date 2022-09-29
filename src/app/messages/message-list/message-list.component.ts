import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'greetings', 'Hello Marcus', 'Luke'),
    new Message(2, 'greetings', 'Hi, How are you doing', 'Marcus'),
    new Message(3, 'greetings', 'I am good, just about coming to you', 'Luke'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
