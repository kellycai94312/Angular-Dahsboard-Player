import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPersonLogsComponent } from './group-person-logs.component';

describe('GroupPersonLogsComponent', () => {
  let component: GroupPersonLogsComponent;
  let fixture: ComponentFixture<GroupPersonLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPersonLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
