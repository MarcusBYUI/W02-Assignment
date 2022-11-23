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

  sortAndSend() {
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
  }

  //returns a contact by id
  getContact(id: string): Contact {
    for (let i = 0; i < this.contacts.length; i++) {
      const element = this.contacts[i];
      if (element._id === id) {
        return element;
      }
    }
    return null;
  }

  getContacts() {
    this.http.get('http://localhost:3000/contacts').subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.sortAndSend();
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

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
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

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }
}
