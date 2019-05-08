import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditEventPollComponent} from './edit-event-poll.component';

describe('EditEventPollComponent', () => {
  let component: EditEventPollComponent;
  let fixture: ComponentFixture<EditEventPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEventPollComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
