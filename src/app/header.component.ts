import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output('selectedFeatureEvent') selectedFeature: EventEmitter<string> =
    new EventEmitter();
  constructor() {}

  onSelected(selectedEvent: string) {
    this.selectedFeature.emit(selectedEvent);
  }

  ngOnInit(): void {}
}
