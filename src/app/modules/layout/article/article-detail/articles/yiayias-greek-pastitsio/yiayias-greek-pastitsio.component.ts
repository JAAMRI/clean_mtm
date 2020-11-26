import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../../services/seo.service';

@Component({
  selector: 'app-yiayias-greek-pastitsio',
  templateUrl: './yiayias-greek-pastitsio.component.html',
  styleUrls: ['./yiayias-greek-pastitsio.component.scss']
})
export class YiayiasGreekPastitsioComponent implements OnInit {

  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Yiayias Greek Pastitsio (Lasagna) Recipe | Meals That Matter',
      description: 'This Greek Pastitsio recipe is inspired by my Grandmother Kiki. It busts with flavour an brings me right back to my childhood with every bite.',
      slug: this.router.url
    })
  }

}
