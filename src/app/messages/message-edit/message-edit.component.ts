import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', { static: true }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: true }) msgTextRef: ElementRef;

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  onSendMessage(e: Event) {
    e.preventDefault();
    let id: string = String(this.MessageService.getMaxId() + 1);
    this.MessageService.addMessage(
      new Message(
        id,
        this.subjectRef.nativeElement.value,
        this.msgTextRef.nativeElement.value,
        '637cfd8c802253c01c9d8853'
      )
    );
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
