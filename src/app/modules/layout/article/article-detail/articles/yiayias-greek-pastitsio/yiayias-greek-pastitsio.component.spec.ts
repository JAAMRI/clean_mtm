import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YiayiasGreekPastitsioComponent } from './yiayias-greek-pastitsio.component';

describe('YiayiasGreekPastitsioComponent', () => {
  let component: YiayiasGreekPastitsioComponent;
  let fixture: ComponentFixture<YiayiasGreekPastitsioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YiayiasGreekPastitsioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YiayiasGreekPastitsioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
