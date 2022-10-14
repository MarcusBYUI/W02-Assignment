import { Document } from './document.model';
import { Component, OnInit, Input } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private DocumentService: DocumentService) {}

  ngOnInit(): void {
    this.DocumentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
