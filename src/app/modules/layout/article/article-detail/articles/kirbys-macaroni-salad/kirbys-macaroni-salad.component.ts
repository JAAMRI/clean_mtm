import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../../../../services/seo.service';

@Component({
  selector: 'app-kirbys-macaroni-salad',
  templateUrl: './kirbys-macaroni-salad.component.html',
  styleUrls: ['./kirbys-macaroni-salad.component.scss']
})
export class KirbysMacaroniSaladComponent implements OnInit {

  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Kirbys Macaroni Salad | Meals That Matter',
      description: 'This Middle Eastern Meatball recipe is inspired by my childhood weeknight meals. It is wholesome, aromatic and a crowd pleaser!',
      slug: this.router.url
    })
  }

}
