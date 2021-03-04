import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealTabComponent } from './meal-tab.component';

describe('MealTabComponent', () => {
  let component: MealTabComponent;
  let fixture: ComponentFixture<MealTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
