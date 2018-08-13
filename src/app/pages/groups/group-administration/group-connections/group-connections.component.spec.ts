import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupConnectionsComponent } from './group-connections.component';

describe('GroupConnectionsComponent', () => {
  let component: GroupConnectionsComponent;
  let fixture: ComponentFixture<GroupConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
