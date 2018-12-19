import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsStepEditEventComponent} from './groups-step-edit-event.component';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';

describe('GroupsStepEditEventComponent', () => {
  let component: GroupsStepEditEventComponent<BaseTraining>;
  let fixture: ComponentFixture<GroupsStepEditEventComponent<BaseTraining>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsStepEditEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsStepEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
