import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  subscription: Subscription;
  invalid: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group)
        );
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/contacts');
  }

  onSubmit(form: NgForm) {}

  onDropSuccess() {}

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      // newContact has no value
      this.invalid = true;

      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      this.invalid = true;

      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        this.invalid = true;

        return true;
      }
    }
    this.invalid = false;

    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
