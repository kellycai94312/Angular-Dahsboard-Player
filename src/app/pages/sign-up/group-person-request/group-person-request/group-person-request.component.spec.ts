import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPersonRequestComponent } from './group-person-request.component';

describe('GroupPersonRequestComponent', () => {
  let component: GroupPersonRequestComponent;
  let fixture: ComponentFixture<GroupPersonRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPersonRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
