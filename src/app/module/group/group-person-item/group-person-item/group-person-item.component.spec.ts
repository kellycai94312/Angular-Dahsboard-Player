import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupPersonItemComponent} from './group-person-item.component';

describe('GroupPersonItemComponent', () => {
  let component: GroupPersonItemComponent;
  let fixture: ComponentFixture<GroupPersonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPersonItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
