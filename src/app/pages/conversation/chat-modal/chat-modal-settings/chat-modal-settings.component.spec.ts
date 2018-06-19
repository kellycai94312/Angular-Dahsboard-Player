import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatModalSettingsComponent} from './chat-modal-settings.component';

describe('ChatModalSettingsComponent', () => {
  let component: ChatModalSettingsComponent;
  let fixture: ComponentFixture<ChatModalSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatModalSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatModalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
