import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonsStepEditEventComponent} from './persons-step-edit-event.component';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';

describe('PersonsStepEditEventComponent', () => {
  let component: PersonsStepEditEventComponent<BaseTraining>;
  let fixture: ComponentFixture<PersonsStepEditEventComponent<BaseTraining>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsStepEditEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsStepEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
