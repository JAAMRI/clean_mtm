import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Filters, IFilter, Disclosures } from './filter.data';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent {

  filters: IFilter[] = Filters;
  disclosures = Disclosures;

  constructor(public dialogRef: MatDialogRef<FilterComponent>) { }

  setActiveFilter(id: number) {
    this.filters.forEach((filter: IFilter) => {
        filter.active = (filter.id === id);
    });
  }
  

  clear() {
    this.setActiveFilter(null);
  }
}
