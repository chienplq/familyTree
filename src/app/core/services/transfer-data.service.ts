import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private messageSource= new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();
  version=0;

  constructor() { }

  changeMessage(message: string){
    this.messageSource.next(this.version++ +message);
  }
}
