import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealDetailComponent } from './meal-detail.component';

describe('MealDetailComponent', () => {
  let component: MealDetailComponent;
  let fixture: ComponentFixture<MealDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
