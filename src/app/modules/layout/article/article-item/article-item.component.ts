import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {


  unsubscribeAll = new Subject();
  articles: string[] = ['what-and-what-not-to-freeze'];
  showArticle: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadArticleBasedOffRoute()
  }

  loadArticleBasedOffRoute(): void {
    this.route.params.pipe(takeUntil(this.unsubscribeAll)).subscribe((params: ParamMap) => {
      //  watch route and load article depending on route id
   
      if (params['id']) {
        const article = params['id'];

      } else {
        this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });

      }
    })
  }


  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
