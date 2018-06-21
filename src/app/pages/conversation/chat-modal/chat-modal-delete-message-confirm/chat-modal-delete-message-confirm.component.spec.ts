import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatModalDeleteMessageConfirmComponent} from './chat-modal-delete-message-confirm.component';

describe('ChatModalDeleteMessageConfirmComponent', () => {
  let component: ChatModalDeleteMessageConfirmComponent;
  let fixture: ComponentFixture<ChatModalDeleteMessageConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatModalDeleteMessageConfirmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatModalDeleteMessageConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
