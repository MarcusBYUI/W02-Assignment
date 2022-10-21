import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[];

  constructor(private DocumentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.DocumentService.getDocuments();
    this.DocumentService.documentChangedEvent.subscribe(
      (documents: Document[]) => (this.documents = documents)
    );
  }
}
