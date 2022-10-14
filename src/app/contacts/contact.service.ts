import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[];

  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  //returns all contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  //returns a contact by id
  getContact(id: string): Contact {
    this.contacts.forEach((item: Contact) => {
      if (item.id == id) return item;
    });
    return null;
  }
}
