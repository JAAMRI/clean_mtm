import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YouWillLoveThisComponent } from './you-will-love-this.component';

describe('YouWillLoveThisComponent', () => {
  let component: YouWillLoveThisComponent;
  let fixture: ComponentFixture<YouWillLoveThisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ YouWillLoveThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouWillLoveThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
