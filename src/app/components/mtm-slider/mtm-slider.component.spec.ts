import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtmSliderComponent } from './mtm-slider.component';

describe('MtmSliderComponent', () => {
  let component: MtmSliderComponent;
  let fixture: ComponentFixture<MtmSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtmSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtmSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
