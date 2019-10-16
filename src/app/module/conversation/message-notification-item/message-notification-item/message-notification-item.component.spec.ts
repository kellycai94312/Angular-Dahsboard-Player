import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNotificationItemComponent } from './message-notification-item.component';

describe('MessageNotificationItemComponent', () => {
  let component: MessageNotificationItemComponent;
  let fixture: ComponentFixture<MessageNotificationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageNotificationItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
