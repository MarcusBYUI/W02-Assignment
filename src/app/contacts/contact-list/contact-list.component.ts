import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  term: string;

  constructor(private ContactService: ContactService) {}

  ngOnInit(): void {
    this.ContactService.getContacts();
    this.ContactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => (this.contacts = contacts)
    );
  }

  search(value: string) {
    this.term = value;
  }
}
