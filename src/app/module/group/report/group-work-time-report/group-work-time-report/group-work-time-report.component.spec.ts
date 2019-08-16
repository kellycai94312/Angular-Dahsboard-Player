import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupWorkTimeReportComponent} from './group-work-time-report.component';

describe('GroupWorkTimeReportComponent', () => {
  let component: GroupWorkTimeReportComponent;
  let fixture: ComponentFixture<GroupWorkTimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupWorkTimeReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupWorkTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
