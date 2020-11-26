import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViranllysKoreanRiceBowlComponent } from './viranllys-korean-rice-bowl.component';

describe('ViranllysKoreanRiceBowlComponent', () => {
  let component: ViranllysKoreanRiceBowlComponent;
  let fixture: ComponentFixture<ViranllysKoreanRiceBowlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViranllysKoreanRiceBowlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViranllysKoreanRiceBowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
