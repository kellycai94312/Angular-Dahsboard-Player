import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainingReportBlockComponent} from './training-report-block.component';

describe('TrainingReportBlockComponent', () => {
  let component: TrainingReportBlockComponent;
  let fixture: ComponentFixture<TrainingReportBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingReportBlockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingReportBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
