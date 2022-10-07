import { Document } from './document.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor() {}

  ngOnInit(): void {}
}
