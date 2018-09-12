import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupConnectionsGraphComponent} from './group-connections-graph.component';

describe('GroupConnectionsGraphComponent', () => {
  let component: GroupConnectionsGraphComponent;
  let fixture: ComponentFixture<GroupConnectionsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupConnectionsGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupConnectionsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
