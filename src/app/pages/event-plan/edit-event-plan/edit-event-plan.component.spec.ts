import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditEventPlanComponent} from './edit-event-plan.component';

describe('EditEventPlanComponent', () => {
  let component: EditEventPlanComponent;
  let fixture: ComponentFixture<EditEventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEventPlanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
