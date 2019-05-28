import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditBaseEventComponent} from './edit-base-event.component';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';

describe('EditBaseEventComponent', () => {
  let component: EditBaseEventComponent<BaseEvent>;
  let fixture: ComponentFixture<EditBaseEventComponent<BaseEvent>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditBaseEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBaseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
