import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalState {

  private data = new Subject<object>();
  private dataStream$ = this.data.asObservable();

  private subscriptions: Map<string, Array<(en) => void>> = new Map<string, Array<(en) => void>>();

  constructor() {
    // console.log(this.dataStream$)
    this.dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {
    // console.log(this.dataStream$)
    const current = this.data[event];
    if (current !== value) {
      this.data[event] = value;

      this.data.next({
        event,
        data: this.data[event]
      });
    }
  }
  removeSubscribe(event: string) {
    if (this.subscriptions.has(event)) {
      this.subscriptions.delete(event);
    }
  }


  subscribe(event: string, callback: (en) => void) {
    const subscribers = this.subscriptions.get(event) || [];
    subscribers.push(callback);

    this.subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    const subscribers = this.subscriptions.get(data.event) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data.data);
    });
  }
}
