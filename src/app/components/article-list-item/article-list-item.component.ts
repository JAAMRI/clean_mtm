import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '../../interfaces/article';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss']
})
export class ArticleListItemComponent implements OnInit {

  @Input() article: IArticle;
  isMobile = window.innerWidth < 768;

  constructor() { }

  ngOnInit(): void {
  }

}
