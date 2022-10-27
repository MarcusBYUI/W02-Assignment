import { Document } from './document.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DocumentService } from './document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  selectedDocument: Document;
  subscription: Subscription;

  constructor(private DocumentService: DocumentService) {}

  ngOnInit(): void {
    this.subscription = this.DocumentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
