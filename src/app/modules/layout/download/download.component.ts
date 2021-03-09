import { Inject, LOCALE_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  downloadables = ['spring-2020-Recipe-Booklet']
  mainImage = this.locale === 'fr' ? environment.frenchImage : environment.englishImage

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
  }

}
