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
    for (let i = 0; i < this.contacts.length; i++) {
      const element = this.contacts[i];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }
}
