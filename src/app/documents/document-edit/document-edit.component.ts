import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  subscription: Subscription;
  constructor(
    private docService: DocumentService,
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

      this.originalDocument = this.docService.getDocument(id);
      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel() {
    this.router.navigateByUrl('/documents');
  }

  onSubmit(form: NgForm) {
    let value = form.value; // get values from form’s fields
    //set id to prev doc or get new id based on edit mode
    let id: string = this.editMode
      ? this.originalDocument.id
      : String(this.docService.getMaxId() + 1);

    let newDocument = new Document(
      id,
      value.title,
      value.description,
      value.url
    );

    if (this.editMode) {
      //   documentService.updateDocument(originalDocument, newDocument)
      this.docService.updateDocument(this.originalDocument, newDocument);
    } else {
      //   documentService.addDocument(newDocument)
      this.docService.addDocument(newDocument);
    }
    //  route back to the '/documents' URL
    this.router.navigateByUrl('/documents');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
