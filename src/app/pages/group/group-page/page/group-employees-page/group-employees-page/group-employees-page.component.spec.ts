import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupEmployeesPageComponent} from './group-employees-page.component';

describe('GroupEmployeesPageComponent', () => {
  let component: GroupEmployeesPageComponent;
  let fixture: ComponentFixture<GroupEmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupEmployeesPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
