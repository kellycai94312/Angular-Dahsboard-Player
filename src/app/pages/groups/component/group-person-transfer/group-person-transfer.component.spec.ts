import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupPersonTransferComponent} from './group-person-transfer.component';

describe('GroupPersonTransferComponent', () => {
  let component: GroupPersonTransferComponent;
  let fixture: ComponentFixture<GroupPersonTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPersonTransferComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPersonTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
