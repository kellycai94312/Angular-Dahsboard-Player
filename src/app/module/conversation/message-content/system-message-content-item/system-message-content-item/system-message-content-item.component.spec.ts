import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemMessageContentItemComponent} from './system-message-content-item.component';

describe('SystemMessageContentItemComponent', () => {
  let component: SystemMessageContentItemComponent;
  let fixture: ComponentFixture<SystemMessageContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMessageContentItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMessageContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
