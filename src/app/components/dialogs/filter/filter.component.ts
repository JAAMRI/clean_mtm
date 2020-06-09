import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('disclaimerWrapper') disclaimersRef: ElementRef;

  constructor(public dialogRef: MatDialogRef<FilterComponent>) { }

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
