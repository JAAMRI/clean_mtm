import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../../services/seo.service';

@Component({
  selector: 'app-kimias-meatball-wrap',
  templateUrl: './kimias-meatball-wrap.component.html',
  styleUrls: ['./kimias-meatball-wrap.component.scss']
})
export class KimiasMeatballWrapComponent implements OnInit {

  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Kimias Middle Eastern Meatball Wrap | Meals That Matter',
      description: 'This Middle Eastern Meatball recipe is inspired by my childhood weeknight meals. It is wholesome, aromatic and a crowd pleaser!',
      slug: this.router.url
    })
  }

}
