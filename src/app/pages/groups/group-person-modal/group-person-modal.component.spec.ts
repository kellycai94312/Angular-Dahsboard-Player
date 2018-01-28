import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPersonModalComponent } from './group-person-modal.component';

describe('GroupPersonModalComponent', () => {
  let component: GroupPersonModalComponent;
  let fixture: ComponentFixture<GroupPersonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPersonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
