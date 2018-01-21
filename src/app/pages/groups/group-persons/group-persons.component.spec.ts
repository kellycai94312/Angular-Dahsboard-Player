import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPersonsComponent } from './group-persons.component';

describe('GroupPersonsComponent', () => {
  let component: GroupPersonsComponent;
  let fixture: ComponentFixture<GroupPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
