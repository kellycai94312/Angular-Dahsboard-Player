import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupPersonsListComponent} from './group-persons-list.component';

describe('GroupPersonsListComponent', () => {
  let component: GroupPersonsListComponent;
  let fixture: ComponentFixture<GroupPersonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPersonsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
