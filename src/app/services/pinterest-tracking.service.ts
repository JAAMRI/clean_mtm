import { Injectable } from '@angular/core';

// declare var pintrk: any;

@Injectable({
  providedIn: 'root'
})
export class PinterestTrackingService {

  constructor() { }

  trackSignup() {
    // @ts-ignore
    pintrk('track', 'signup');

  }
}
