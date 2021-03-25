import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiscoverMealsComponent } from './discover-meals.component';

describe('DiscoverMealsComponent', () => {
  let component: DiscoverMealsComponent;
  let fixture: ComponentFixture<DiscoverMealsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
