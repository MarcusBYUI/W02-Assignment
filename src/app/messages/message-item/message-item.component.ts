import { ContactService } from './../../contacts/contact.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private ContactService: ContactService) {}

  ngOnInit(): void {
    const contact: Contact = this.ContactService.getContact(
      this.message.sender
    );
    this.messageSender = contact.name;
  }
}
