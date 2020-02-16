import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reclaim-weeknight-cooking',
  templateUrl: './reclaim-weeknight-cooking.component.html',
  styleUrls: ['./reclaim-weeknight-cooking.component.scss']
})
export class ReclaimWeeknightCookingComponent implements OnInit {

  @Input() isMobile: any;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
}
