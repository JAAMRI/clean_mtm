import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMealComponent } from './favourite-meal.component';

describe('FavouriteMealComponent', () => {
  let component: FavouriteMealComponent;
  let fixture: ComponentFixture<FavouriteMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
