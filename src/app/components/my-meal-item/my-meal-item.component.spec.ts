import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMealItemComponent } from './my-meal-item.component';

describe('MealItemComponent', () => {
  let component: MyMealItemComponent;
  let fixture: ComponentFixture<MyMealItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMealItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMealItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
