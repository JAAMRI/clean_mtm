import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTabComponent } from './meal-tab.component';

describe('MealTabComponent', () => {
  let component: MealTabComponent;
  let fixture: ComponentFixture<MealTabComponent>;

  beforeEach(async(() => {
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
