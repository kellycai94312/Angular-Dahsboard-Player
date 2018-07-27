import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReportGeneralComponent } from './event-report-general.component';

describe('EventReportGeneralComponent', () => {
  let component: EventReportGeneralComponent;
  let fixture: ComponentFixture<EventReportGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventReportGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReportGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
