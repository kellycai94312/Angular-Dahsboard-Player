import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureHistoryComponent } from './measure-history.component';

describe('MeasureHistoryComponent', () => {
  let component: MeasureHistoryComponent;
  let fixture: ComponentFixture<MeasureHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
