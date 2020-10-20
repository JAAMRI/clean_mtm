import { TestBed } from '@angular/core/testing';

import { PinterestTrackingService } from './pinterest-tracking.service';

describe('PinterestTrackingService', () => {
  let service: PinterestTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinterestTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
