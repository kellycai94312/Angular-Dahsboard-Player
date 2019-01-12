import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupSubscribersPageComponent} from './group-subscribers-page.component';

describe('GroupSubscribersPageComponent', () => {
  let component: GroupSubscribersPageComponent;
  let fixture: ComponentFixture<GroupSubscribersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSubscribersPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSubscribersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
