import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatAndWhatNotToFreezeComponent } from './what-and-what-not-to-freeze.component';

describe('WhatAndWhatNotToFreezeComponent', () => {
  let component: WhatAndWhatNotToFreezeComponent;
  let fixture: ComponentFixture<WhatAndWhatNotToFreezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatAndWhatNotToFreezeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatAndWhatNotToFreezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
