import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupPersonClaimStateComponent } from './edit-group-person-claim-state.component';

describe('EditGroupPersonClaimStateComponent', () => {
  let component: EditGroupPersonClaimStateComponent;
  let fixture: ComponentFixture<EditGroupPersonClaimStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupPersonClaimStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPersonClaimStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
