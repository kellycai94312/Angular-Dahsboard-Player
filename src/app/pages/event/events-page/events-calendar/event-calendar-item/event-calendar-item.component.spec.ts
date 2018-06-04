import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarItemComponent } from './event-calendar-item.component';

describe('EventCalendarItemComponent', () => {
  let component: EventCalendarItemComponent;
  let fixture: ComponentFixture<EventCalendarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
