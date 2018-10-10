import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsEventPlanComponent} from './persons-event-plan.component';

describe('PersonsEventPlanComponent', () => {
  let component: PersonsEventPlanComponent;
  let fixture: ComponentFixture<PersonsEventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsEventPlanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsEventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
