import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnChanges {

  @Output() search = new EventEmitter();
  @Input() searchQuery: string
  searchFormControl: FormControl = new FormControl();
  unsubscribeMe = new Subject();
  loading = false;

  constructor() { }

  ngOnInit() {
    this.watchSearch();
  }

  ngOnChanges(changes: any) {
    if (changes) {
      this.searchFormControl.setValue(this.searchQuery);
    }
  }

  watchSearch() {
    this.searchFormControl.valueChanges.pipe(
      takeUntil(this.unsubscribeMe),
      debounceTime(400),
    ).subscribe((query) => {
      // if (query) {
        this.search.emit(query);
      // }
    });
  }

}
