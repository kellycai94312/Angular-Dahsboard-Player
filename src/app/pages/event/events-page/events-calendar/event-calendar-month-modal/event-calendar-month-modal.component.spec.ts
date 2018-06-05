import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarMonthModalComponent } from './event-calendar-month-modal.component';

describe('EventCalendarMonthModalComponent', () => {
  let component: EventCalendarMonthModalComponent;
  let fixture: ComponentFixture<EventCalendarMonthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarMonthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarMonthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
