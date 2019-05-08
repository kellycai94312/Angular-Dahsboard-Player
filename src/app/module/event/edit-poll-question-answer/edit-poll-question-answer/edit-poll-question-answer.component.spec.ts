import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPollQuestionAnswerComponent} from './edit-poll-question-answer.component';

describe('EditPollQuestionAnswerComponent', () => {
  let component: EditPollQuestionAnswerComponent;
  let fixture: ComponentFixture<EditPollQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPollQuestionAnswerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPollQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
