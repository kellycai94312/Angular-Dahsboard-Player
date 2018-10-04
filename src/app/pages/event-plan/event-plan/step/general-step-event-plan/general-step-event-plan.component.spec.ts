import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralStepEventPlanComponent} from './general-step-event-plan.component';

describe('GeneralStepEventPlanComponent', () => {
  let component: GeneralStepEventPlanComponent;
  let fixture: ComponentFixture<GeneralStepEventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralStepEventPlanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStepEventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
