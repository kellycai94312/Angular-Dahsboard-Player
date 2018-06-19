import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModalCreateComponent } from './chat-modal-create.component';

describe('ChatModalCreateComponent', () => {
  let component: ChatModalCreateComponent;
  let fixture: ComponentFixture<ChatModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
