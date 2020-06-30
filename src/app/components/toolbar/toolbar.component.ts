import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Breadcrumb } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  @Output() onLogoClick = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Input() breadcrumbs: Breadcrumb[];
  @Input() showBreadcrumbs: boolean;
  

  emitLogoClicked() {
    this.onLogoClick.emit();
  }

  emitToggle() {
    this.toggle.emit();
  }



}
