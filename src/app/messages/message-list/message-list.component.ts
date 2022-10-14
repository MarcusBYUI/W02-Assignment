import { Message } from './../message.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.MessageService.getMessages();
    this.MessageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
