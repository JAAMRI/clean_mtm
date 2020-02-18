import { Component, OnInit, Input } from '@angular/core';
import { AdobeDtbTracking } from 'src/app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-reclaim-weeknight-cooking',
  templateUrl: './reclaim-weeknight-cooking.component.html',
  styleUrls: ['./reclaim-weeknight-cooking.component.scss']
})
export class ReclaimWeeknightCookingComponent implements OnInit {

  @Input() responsiveness: any;

  constructor(
    public adobeDtbTracking: AdobeDtbTracking,
  ) { }

  ngOnInit(): void {
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
}
