import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationRemovingMessageComponent} from './confirmation-removing-message.component';

describe('ConfirmationRemovingMessageComponent', () => {
  let component: ConfirmationRemovingMessageComponent;
  let fixture: ComponentFixture<ConfirmationRemovingMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationRemovingMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRemovingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
