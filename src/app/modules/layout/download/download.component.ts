import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  downloadables = ['spring-2020-Recipe-Booklet']

  constructor() { }

  ngOnInit(): void {
  }

}
