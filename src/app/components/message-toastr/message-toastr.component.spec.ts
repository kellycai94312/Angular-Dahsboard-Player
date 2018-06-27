import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageToastrComponent} from './message-toastr.component';

describe('MessageToastrComponent', () => {
  let component: MessageToastrComponent;
  let fixture: ComponentFixture<MessageToastrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageToastrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
