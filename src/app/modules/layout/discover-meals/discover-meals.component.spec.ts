import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMealsComponent } from './discover-meals.component';

describe('DiscoverMealsComponent', () => {
  let component: DiscoverMealsComponent;
  let fixture: ComponentFixture<DiscoverMealsComponent>;

  beforeEach(async(() => {
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
