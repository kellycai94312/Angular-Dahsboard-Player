import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventItemComponent} from './event-item.component';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';

describe('EventItemComponent', () => {
  let component: EventItemComponent<BaseTraining>;
  let fixture: ComponentFixture<EventItemComponent<BaseTraining>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
