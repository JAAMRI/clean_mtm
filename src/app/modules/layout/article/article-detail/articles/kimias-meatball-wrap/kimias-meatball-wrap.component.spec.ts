import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KimiasMeatballWrapComponent } from './kimias-meatball-wrap.component';

describe('KimiasMeatballWrapComponent', () => {
  let component: KimiasMeatballWrapComponent;
  let fixture: ComponentFixture<KimiasMeatballWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KimiasMeatballWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KimiasMeatballWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
