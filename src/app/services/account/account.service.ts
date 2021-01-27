import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  public loggedIn = false;
  public authStateChanged = new Subject()

  constructor() { }

  setLoggedIn(loggedIn: boolean){
    this.loggedIn = loggedIn;
  } 

  emitAuthStateChanged() {
    this.authStateChanged.next()
  }



}
