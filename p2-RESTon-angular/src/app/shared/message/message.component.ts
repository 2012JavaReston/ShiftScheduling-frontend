import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Message } from 'src/app/models/message';

@Component({
  selector: 'rev-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  
  constructor() { }

  ngOnInit(): void {
  }

  getName(): string {
    if (this.message.sender === undefined) {
      return;
    }
    return this.message.sender.firstName + ' ' + this.message.sender.lastName;
  }

  formatDate(date: Date) {

    return moment(date).format('DD/MM/YYYY hh:MM A');
  }
}
