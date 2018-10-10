import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventPlanPersonItemComponent} from './event-plan-person-item.component';

describe('EventPlanPersonItemComponent', () => {
  let component: EventPlanPersonItemComponent;
  let fixture: ComponentFixture<EventPlanPersonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlanPersonItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanPersonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
