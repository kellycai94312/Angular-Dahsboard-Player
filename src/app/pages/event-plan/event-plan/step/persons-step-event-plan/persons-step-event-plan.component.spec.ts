import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsStepEventPlanComponent} from './persons-step-event-plan.component';

describe('PersonsStepEventPlanComponent', () => {
  let component: PersonsStepEventPlanComponent;
  let fixture: ComponentFixture<PersonsStepEventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsStepEventPlanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsStepEventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
