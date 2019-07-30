import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupContractListComponent} from './group-contract-list.component';

describe('GroupContractListComponent', () => {
  let component: GroupContractListComponent;
  let fixture: ComponentFixture<GroupContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupContractListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
