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
      const clientSecret = environment.dropSecret;
      await this.httpClient.get(`https://admin.dropinternal.com/partners/postbacks?partner_id=61&secret=${clientSecret}&shared_id=${sharedId}&status=APPROVED`).toPromise();
  }
}
