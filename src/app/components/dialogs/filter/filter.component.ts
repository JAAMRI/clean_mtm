import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {

  filters = [];
  activeFilter = 0;

  constructor(public dialogRef: MatDialogRef<FilterComponent>) { }

  ngOnInit(): void {
    this.getFilters()
  }

  getFilters() {
    for(let i=1; i<20; i++) {
      this.filters.push({id: i, name: 'Lorem ipsum dolor sit.'})
    }
  }

  setActiveFilter(id: number) {
    this.activeFilter = id === this.activeFilter ? 0 : id;
    this.dialogRef.close();
  }

  clear() {
    this.activeFilter = null;
  }

}
