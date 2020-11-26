import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackysDeviledEggsComponent } from './jackys-deviled-eggs.component';

describe('JackysDeviledEggsComponent', () => {
  let component: JackysDeviledEggsComponent;
  let fixture: ComponentFixture<JackysDeviledEggsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JackysDeviledEggsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackysDeviledEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
