import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupTreeComponent} from './group-tree.component';

describe('GroupTreeComponent', () => {
  let component: GroupTreeComponent;
  let fixture: ComponentFixture<GroupTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
