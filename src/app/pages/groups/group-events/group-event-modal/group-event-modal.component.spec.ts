import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEventModalComponent } from './group-event-modal.component';

describe('GroupEventModalComponent', () => {
  let component: GroupEventModalComponent;
  let fixture: ComponentFixture<GroupEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
