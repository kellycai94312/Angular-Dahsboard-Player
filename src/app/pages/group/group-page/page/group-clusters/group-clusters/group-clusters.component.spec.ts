import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupClustersComponent} from './group-clusters.component';

describe('GroupClustersComponent', () => {
  let component: GroupClustersComponent;
  let fixture: ComponentFixture<GroupClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupClustersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
