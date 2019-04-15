import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupOutcomingRequestsComponent} from './group-outcoming-requests.component';

describe('GroupOutcomingRequestsComponent', () => {
  let component: GroupOutcomingRequestsComponent;
  let fixture: ComponentFixture<GroupOutcomingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupOutcomingRequestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOutcomingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
