import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureInputComponent } from './measure-input.component';

describe('MeasureInputComponent', () => {
  let component: MeasureInputComponent;
  let fixture: ComponentFixture<MeasureInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
