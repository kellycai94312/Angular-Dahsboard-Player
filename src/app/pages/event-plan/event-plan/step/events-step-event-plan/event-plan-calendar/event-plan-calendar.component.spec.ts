import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventPlanCalendarComponent} from './event-plan-calendar.component';

describe('EventPlanCalendarComponent', () => {
  let component: EventPlanCalendarComponent;
  let fixture: ComponentFixture<EventPlanCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlanCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
