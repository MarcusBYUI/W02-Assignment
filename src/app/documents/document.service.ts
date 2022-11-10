import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[];
  maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http
      .get(
        'https://ng-cms-app-9d43b-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents = this.documents.sort((a: Document, b: Document) => {
            if (a.id < b.id) {
              return -1;
            } else if (a.id > b.id) {
              return 1;
            } else {
              return 0;
            }
          });

          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  storeDocuments() {
    const body = JSON.stringify(this.documents.slice());
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .put(
        'https://ng-cms-app-9d43b-default-rtdb.firebaseio.com/documents.json',
        body,
        { headers }
      )
      .subscribe({
        next: () => {
          this.documentChangedEvent.next(this.documents.slice());
        },
      });
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
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let i = 0; i < this.documents.length; i++) {
      const element = this.documents[i];
      if (Number(element.id) > maxId) {
        maxId = Number(element.id);
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}
