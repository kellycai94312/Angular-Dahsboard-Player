import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupItemComponent} from './group-item.component';
import {Group} from '../../../../data/remote/model/group/base/group';

describe('GroupItemComponent', () => {
  let component: GroupItemComponent<Group>;
  let fixture: ComponentFixture<GroupItemComponent<Group>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
