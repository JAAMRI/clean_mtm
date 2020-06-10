import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Filters, IFilter, Disclaimers } from './filter.data';

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

  constructor(public dialogRef: MatDialogRef<FilterComponent>) { }

  @HostListener('scroll', ['$event'])
  onElementScroll(event: any) {
    console.log(event)
    this.hideScroll = true;

  }

  setActiveFilter(id: number) {
    let activeFilter: any;
    this.filters.forEach((filter: any) => {
      if (filter.id === id) {
        filter.active = true;
        activeFilter = {[filter.key]: filter.value};
      } else {
        filter.active = false;
      }

    });

    this.dialogRef.close(activeFilter);
  }

  clear() {
    this.setActiveFilter(null);
  }

  scrollDown() {
    this.disclaimersRef.nativeElement.scrollIntoView({behavior: 'smooth'}) ;

  }
}
