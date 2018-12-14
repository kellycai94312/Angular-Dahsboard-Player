import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupPersonRequestsPageComponent} from './group-person-requests-page.component';

describe('GroupPersonRequestsPageComponent', () => {
  let component: GroupPersonRequestsPageComponent;
  let fixture: ComponentFixture<GroupPersonRequestsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPersonRequestsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
