import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupTransitionComponent} from './group-transition.component';

describe('GroupTransitionComponent', () => {
  let component: GroupTransitionComponent;
  let fixture: ComponentFixture<GroupTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTransitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
