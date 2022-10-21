import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[];

  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
  documentChangedEvent: EventEmitter<Document[]> = new EventEmitter();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string) {
    for (let i = 0; i < this.documents.length; i++) {
      const element = this.documents[i];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
