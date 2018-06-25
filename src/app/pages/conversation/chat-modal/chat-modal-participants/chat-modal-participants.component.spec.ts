import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatModalParticipantsComponent} from './chat-modal-participants.component';

describe('ChatModalParticipantsComponent', () => {
  let component: ChatModalParticipantsComponent;
  let fixture: ComponentFixture<ChatModalParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatModalParticipantsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatModalParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
