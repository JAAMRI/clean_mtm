import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkout51Component } from './checkout51.component';

describe('Checkout51Component', () => {
  let component: Checkout51Component;
  let fixture: ComponentFixture<Checkout51Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Checkout51Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Checkout51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
