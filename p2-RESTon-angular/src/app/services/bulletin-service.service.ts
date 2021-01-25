import { BulletinMessageApiService } from './rest/bulletin-message-api.service';
import { BehaviorSubject, interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { BulletinMessage } from '../models/bulletin-message';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BulletinServiceService {

  apiWorking: boolean = false;

  buletinMessages: BehaviorSubject<BulletinMessage[]> = new BehaviorSubject<BulletinMessage[]>([]);

  isPolling: boolean = false;

  constructor(private bulletinMessageApiService: BulletinMessageApiService) { }

  polebulletinMessages(): void {
    // Not sure about this working yet. We need the api to be working to get this to work
    interval(500).pipe(startWith(0), switchMap(() => this.bulletinMessageApiService.get()))
    .subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  populateBulletinMessages(): Promise<string> {
    return new Promise((resolve, reject) => {

      if(!this.apiWorking){
        return resolve('Messages retrieved successfully.');
      }

      this.bulletinMessageApiService.get()
      .then(res => {
        this.buletinMessages.next(res);
        resolve('Messages retrieved successfully.');
      })
      .catch(error => {
        console.log(error);
        reject('There was an error getting the messages.');
      })
    })
  }

  postBulletinMessage(message: BulletinMessage): Promise<string> {
    return new Promise((resolve, reject) => {

      if(!this.apiWorking){
        this.addMessageToBulletin(message);
        return resolve('Messages retrieved successfully.');
      }

      this.bulletinMessageApiService.post(message)
      .then(res => {
        this.addMessageToBulletin(message);
        resolve('Message posted.');
      })
      .catch(error => {
        console.log(error);

        reject('There was an error posting your message');
      })
    })
  }

  private addMessageToBulletin(message: BulletinMessage): void {
    let messages = this.buletinMessages.value;
    messages.push(message);
    this.buletinMessages.next(messages);
  }
}