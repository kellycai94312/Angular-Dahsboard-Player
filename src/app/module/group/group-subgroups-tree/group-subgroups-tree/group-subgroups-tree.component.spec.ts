import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSubgroupsTreeComponent } from './group-subgroups-tree.component';

describe('GroupSubgroupsTreeComponent', () => {
  let component: GroupSubgroupsTreeComponent;
  let fixture: ComponentFixture<GroupSubgroupsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSubgroupsTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSubgroupsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
