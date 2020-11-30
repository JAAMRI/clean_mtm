import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../../services/seo.service';

@Component({
  selector: 'app-jackys-deviled-eggs',
  templateUrl: './jackys-deviled-eggs.component.html',
  styleUrls: ['./jackys-deviled-eggs.component.scss']
})
export class JackysDeviledEggsComponent implements OnInit {

  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit() {
    this.seoService.generateTags({
      title: 'Jackys Deviled Eggs Recipe | Meals That Matter',
      description: 'Deviled Eggs is inspired by my childhood memory of Mom making it for our guests. They are easy, delicious and presented beautifully. Try today with help from Meals That Matter.',
      slug: this.router.url
    })
  }

}
