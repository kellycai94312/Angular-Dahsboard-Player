import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupIncomingRequestsComponent} from './group-incoming-requests.component';

describe('GroupIncomingRequestsComponent', () => {
  let component: GroupIncomingRequestsComponent;
  let fixture: ComponentFixture<GroupIncomingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupIncomingRequestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupIncomingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
