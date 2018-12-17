import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralStepEditEventComponent} from './general-step-edit-event.component';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';

describe('GeneralStepEditEventComponent', () => {
  let component: GeneralStepEditEventComponent<BaseTraining>;
  let fixture: ComponentFixture<GeneralStepEditEventComponent<BaseTraining>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralStepEditEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStepEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
