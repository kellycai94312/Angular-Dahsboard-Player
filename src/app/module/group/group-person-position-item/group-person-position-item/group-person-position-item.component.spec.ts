import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupPersonPositionItemComponent} from './group-person-position-item.component';

describe('GroupPersonPositionItemComponent', () => {
  let component: GroupPersonPositionItemComponent;
  let fixture: ComponentFixture<GroupPersonPositionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPersonPositionItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonPositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
