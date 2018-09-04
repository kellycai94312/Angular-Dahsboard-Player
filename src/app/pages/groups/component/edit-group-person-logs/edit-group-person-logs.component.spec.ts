import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupPersonLogsComponent } from './edit-group-person-logs.component';

describe('EditGroupPersonLogsComponent', () => {
  let component: EditGroupPersonLogsComponent;
  let fixture: ComponentFixture<EditGroupPersonLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupPersonLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPersonLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
