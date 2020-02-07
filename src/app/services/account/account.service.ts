import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountEndpoint = '/xyz/update'
  apiHost = environment.host;
  
  public loggedIn = false;
  public authStateChanged = new Subject()

  constructor(private http: HttpClient) { }

  setLoggedIn(loggedIn: boolean){
    this.loggedIn = loggedIn;
  } 

  emitAuthStateChanged() {
    this.authStateChanged.next()
  }

  updateAccount(accountProps: any) {
    // USE THIS FUNCTION TO UPDATE ACCOUNT INFO TO BACKEND
    // return this.http.put(this.apiHost + this.accountEndpoint, accountProps).pipe(catchError((error) => of(error))).toPromise();

  }




}
