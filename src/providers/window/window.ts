import { Injectable } from '@angular/core';

@Injectable()
export class WindowProvider {
  public window: any;
  constructor() {
    console.log('Hello Window Provider');
    this.window = window;
  }
}
