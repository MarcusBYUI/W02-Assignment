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

  sortAndSend() {
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
  }

  getDocuments() {
    this.http.get('http://localhost:3000/documents').subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortAndSend();
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

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }
}
