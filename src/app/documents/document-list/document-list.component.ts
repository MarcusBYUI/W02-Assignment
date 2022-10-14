import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[];

  @Output('selectedDocumentEvent') selectedDocument: EventEmitter<Document> =
    new EventEmitter();

  constructor(private DocumentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.DocumentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.DocumentService.documentSelectedEvent.emit(document);
  }
}
