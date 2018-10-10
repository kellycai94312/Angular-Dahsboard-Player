import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventPlanLoadsComponent} from './event-plan-loads.component';

describe('EventPlanLoadsComponent', () => {
  let component: EventPlanLoadsComponent;
  let fixture: ComponentFixture<EventPlanLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlanLoadsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
