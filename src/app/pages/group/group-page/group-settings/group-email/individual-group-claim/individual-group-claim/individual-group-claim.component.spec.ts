import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGroupClaimComponent } from './individual-group-claim.component';

describe('IndividualGroupClaimComponent', () => {
  let component: IndividualGroupClaimComponent;
  let fixture: ComponentFixture<IndividualGroupClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualGroupClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualGroupClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
