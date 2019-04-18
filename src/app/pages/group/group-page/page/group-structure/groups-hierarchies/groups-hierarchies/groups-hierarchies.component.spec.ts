import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsHierarchiesComponent} from './groups-hierarchies.component';

describe('GroupsHierarchiesComponent', () => {
  let component: GroupsHierarchiesComponent;
  let fixture: ComponentFixture<GroupsHierarchiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsHierarchiesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsHierarchiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
