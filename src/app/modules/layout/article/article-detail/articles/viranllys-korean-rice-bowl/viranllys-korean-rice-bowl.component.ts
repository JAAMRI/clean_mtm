import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../../services/seo.service';

@Component({
  selector: 'app-viranllys-korean-rice-bowl',
  templateUrl: './viranllys-korean-rice-bowl.component.html',
  styleUrls: ['./viranllys-korean-rice-bowl.component.scss']
})
export class ViranllysKoreanRiceBowlComponent implements OnInit {

  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Viranlly’s Korean Rice Bowl Recipe | Meals That Matter',
      description: `This Korean-ish bowl is a healthier version of what would've been an action-packed, family style Korean BBQ. A meal that takes me back to Christmas time in LA. Try today with help from Meals That Matter.`,
      slug: this.router.url
    })
  }

}
