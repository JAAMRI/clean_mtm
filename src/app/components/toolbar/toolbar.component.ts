import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
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
