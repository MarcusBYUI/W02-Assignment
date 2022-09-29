import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  currentSender: string = 'Marcus';

  @ViewChild('subject', { static: true }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: true }) msgTextRef: ElementRef;

  @Output('addMessageEvent') addMessage: EventEmitter<Message> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSendMessage(e: Event) {
    e.preventDefault();
    this.addMessage.emit(
      new Message(
        1,
        this.subjectRef.nativeElement.value,
        this.msgTextRef.nativeElement.value,
        this.currentSender
      )
    );
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
