import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KirbysMacaroniSaladComponent } from './kirbys-macaroni-salad.component';

describe('KirbysMacaroniSaladComponent', () => {
  let component: KirbysMacaroniSaladComponent;
  let fixture: ComponentFixture<KirbysMacaroniSaladComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KirbysMacaroniSaladComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KirbysMacaroniSaladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
