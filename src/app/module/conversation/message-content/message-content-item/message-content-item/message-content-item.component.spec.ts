import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageContentItemComponent} from './message-content-item.component';

describe('MessageContentItemComponent', () => {
  let component: MessageContentItemComponent;
  let fixture: ComponentFixture<MessageContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageContentItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
