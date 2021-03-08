import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReclaimWeeknightCookingComponent } from './reclaim-weeknight-cooking.component';

describe('ReclaimWeeknightCookingComponent', () => {
  let component: ReclaimWeeknightCookingComponent;
  let fixture: ComponentFixture<ReclaimWeeknightCookingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclaimWeeknightCookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclaimWeeknightCookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
