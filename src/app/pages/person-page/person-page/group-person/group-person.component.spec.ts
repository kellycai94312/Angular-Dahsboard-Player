import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPersonComponent } from './group-person.component';

describe('GroupPersonComponent', () => {
  let component: GroupPersonComponent;
  let fixture: ComponentFixture<GroupPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
