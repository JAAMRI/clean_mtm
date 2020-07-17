import { TestBed } from '@angular/core/testing';

import { WidgetHelperService } from './widget-helper.service';

describe('WidgetHelperService', () => {
  let service: WidgetHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
