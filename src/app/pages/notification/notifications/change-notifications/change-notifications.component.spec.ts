import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeNotificationsComponent} from './change-notifications.component';

describe('ChangeNotificationsComponent', () => {
  let component: ChangeNotificationsComponent;
  let fixture: ComponentFixture<ChangeNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeNotificationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
