import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  public loggedIn = false;
  public authStateChanged = new Subject()

  constructor(private http: HttpClient) { }

  setLoggedIn(loggedIn: boolean){
    this.loggedIn = loggedIn;
  } 

  emitAuthStateChanged() {
    this.authStateChanged.next()
  }



}
