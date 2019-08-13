import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupGroupAttendanceReportComponent} from './subgroup-group-attendance-report.component';

describe('SubgroupGroupAttendanceReportComponent', () => {
  let component: SubgroupGroupAttendanceReportComponent;
  let fixture: ComponentFixture<SubgroupGroupAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupGroupAttendanceReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupGroupAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
