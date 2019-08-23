import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupPositionItemComponent} from './group-position-item.component';

describe('GroupPositionItemComponent', () => {
  let component: GroupPositionItemComponent;
  let fixture: ComponentFixture<GroupPositionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPositionItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
