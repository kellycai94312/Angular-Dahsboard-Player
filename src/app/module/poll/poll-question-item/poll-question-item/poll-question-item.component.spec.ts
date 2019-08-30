import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PollQuestionItemComponent} from './poll-question-item.component';

describe('PollQuestionItemComponent', () => {
  let component: PollQuestionItemComponent;
  let fixture: ComponentFixture<PollQuestionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PollQuestionItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollQuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
