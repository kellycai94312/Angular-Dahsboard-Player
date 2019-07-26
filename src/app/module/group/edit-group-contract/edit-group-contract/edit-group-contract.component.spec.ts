import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGroupContractComponent} from './edit-group-contract.component';

describe('EditGroupContractComponent', () => {
  let component: EditGroupContractComponent;
  let fixture: ComponentFixture<EditGroupContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupContractComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
