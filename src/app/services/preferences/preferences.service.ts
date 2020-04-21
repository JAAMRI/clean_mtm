import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AccountService } from '../account/account.service';
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  apiHost = environment.host;
  private preferencesUrl = '/preferences';  // URL to web api

  constructor(
    private http: HttpClient,
    private accountService: AccountService
    ) { }

  savePreferences(preferences: string): Promise<any> {
    return this.accountService.loggedIn ? this.savePreferencesToServer(preferences) : this.savePreferencesToLocalStorage(preferences);
  }

  async savePreferencesToServer(preferences: string): Promise<any> {
    // backend
    let user = await Auth.currentAuthenticatedUser();
    return await Auth.updateUserAttributes(user, {
      'custom:eating_preferences': preferences.toLowerCase()
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async savePreferencesToLocalStorage(preferences: string): Promise<any> {
    // local storage
    return Promise.resolve().then(() =>
      localStorage.setItem('preferences', preferences)
    );
  }

  getPreferences(): Promise<string> {
    return this.accountService.loggedIn ? this.getPreferencesFromServer() : this.getPreferencesFromLocalStorage();
  }

  async getPreferencesFromServer(): Promise<any> {
    // backend
    return await Auth.currentAuthenticatedUser({
      bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(currentUser => {
      return (currentUser.attributes.hasOwnProperty("custom:eating_preferences")) ? currentUser.attributes['custom:eating_preferences'] : "" ;
    })
    .catch(err => {
      return "";//Return empty if server error
      }
    );
  }

  async getPreferencesFromLocalStorage(): Promise<string> {
    // local storage
    return Promise.resolve().then(() => localStorage.getItem('preferences') || '');
  }


}
