import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFinanceComponent } from './group-finance.component';

describe('GroupFinanceComponent', () => {
  let component: GroupFinanceComponent;
  let fixture: ComponentFixture<GroupFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
