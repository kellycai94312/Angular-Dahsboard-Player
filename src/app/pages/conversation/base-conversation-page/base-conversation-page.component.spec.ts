import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseConversationPageComponent} from './base-conversation-page.component';

describe('BaseConversationPageComponent', () => {
  let component: BaseConversationPageComponent;
  let fixture: ComponentFixture<BaseConversationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseConversationPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseConversationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
