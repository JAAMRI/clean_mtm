import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  async handleDropAction(sharedId: string) {
      // const clientSecret = environment.dropSecret;
      const clientSecret = '2557749db3be79907ec7ec7a139f8b288eb948628955ae0942a59b61dfd8a97f';
      // const sharedId = "a7c777b0-ce96-4554-9e01-3dc771bc0ab5"
      await this.httpClient.get(`https://www.joindrop.com/partners/completions?partner_id=61&secret=${clientSecret}&shared_id=${sharedId}&status=APPROVED`).toPromise();
  }
}
