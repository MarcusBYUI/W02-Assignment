import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

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

  getContacts() {
    this.http
      .get('https://ng-cms-app-9d43b-default-rtdb.firebaseio.com/contacts.json')
      .subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts = this.contacts.sort((a: Contact, b: Contact) => {
            if (a.id < b.id) {
              return -1;
            } else if (a.id > b.id) {
              return 1;
            } else {
              return 0;
            }
          });

          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  storeContacts() {
    const body = JSON.stringify(this.contacts.slice());
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .put(
        'https://ng-cms-app-9d43b-default-rtdb.firebaseio.com/contacts.json',
        body,
        { headers }
      )
      .subscribe({
        next: () => {
          this.contactChangedEvent.next(this.contacts.slice());
        },
      });
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
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let i = 0; i < this.contacts.length; i++) {
      const element = this.contacts[i];
      if (Number(element.id) > maxId) {
        maxId = Number(element.id);
      }
    }

    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}
