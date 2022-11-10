import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  subscription: Subscription;

  constructor(private DocumentService: DocumentService) {}

  ngOnInit(): void {
    this.DocumentService.getDocuments();
    this.subscription = this.DocumentService.documentChangedEvent.subscribe(
      (documents: Document[]) => (this.documents = documents)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
