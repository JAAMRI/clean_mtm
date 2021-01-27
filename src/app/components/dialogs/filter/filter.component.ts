import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation, Inject, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disclaimers, Filters, IFilter } from './filter.data';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent {

  filters: IFilter[] = Filters;
  disclaimers = Disclaimers;
  hideScroll = false;
  @ViewChild('disclaimerWrapper') disclaimersRef: ElementRef;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public dialogRef: MatDialogRef<FilterComponent>, public adobeDtbTracking: AdobeDtbTracking, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  @HostListener('scroll', ['$event'])
  onElementScroll(event: any) {
    this.hideScroll = true;
  }

  ngOnInit() {
    if (this.data.resetFilter) {
      this.filters.forEach((filter: IFilter) => {
        filter.active = false;
      })
    } else if (this.data.activeFilterId) {
      this.filters.forEach((filter: IFilter) => {
        filter.active = (filter.id === +this.data.activeFilterId);
      })
    }

  }

  setActiveFilter(id: number | string) {
    let activeFilter: any = {};
    this.filters.forEach((filter: any) => {
      if (filter.id === id) {
        filter.active = true;
        activeFilter = filter;

        this.adobeDtbTracking.anchorLink(`Filter: ${filter.name} clicked!`);

      } else {
        filter.active = false;
      }

    });

    this.dialogRef.close(activeFilter);
  }

  clear() {
    this.setActiveFilter(null);
    this.adobeDtbTracking.anchorLink('CLEAR FILTER');

  }

  scrollDown() {
    this.disclaimersRef.nativeElement.scrollIntoView({ behavior: 'smooth' });

  }
}
