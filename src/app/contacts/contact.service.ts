import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[];

  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter();

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

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
