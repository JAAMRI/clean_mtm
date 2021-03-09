import { Component, OnInit, Input } from '@angular/core';

export interface Breadcrumb {
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: Breadcrumb[];

  constructor() { }

  ngOnInit(): void {
  }

}
