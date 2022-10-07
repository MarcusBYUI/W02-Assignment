import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
    new Document(1, 'Book 1', 'This is the first book', 'https://google.com', [
      {},
    ]),
    new Document(2, 'Book 2', 'This is the second book', 'https://google.com', [
      {},
    ]),
    new Document(3, 'Book 3', 'This is the third book', 'https://google.com', [
      {},
    ]),
    new Document(4, 'Book 4', 'This is the fourth book', 'https://google.com', [
      {},
    ]),
  ];

  @Output('selectedDocumentEvent') selectedDocument: EventEmitter<Document> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocument.emit(document);
  }
}
