import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsStepEventPlanComponent} from './events-step-event-plan.component';

describe('EventsStepEventPlanComponent', () => {
  let component: EventsStepEventPlanComponent;
  let fixture: ComponentFixture<EventsStepEventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsStepEventPlanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsStepEventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
