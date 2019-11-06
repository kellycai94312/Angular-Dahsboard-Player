import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntityGroupClaimComponent } from './legal-entity-group-claim.component';

describe('LegalEntityGroupClaimComponent', () => {
  let component: LegalEntityGroupClaimComponent;
  let fixture: ComponentFixture<LegalEntityGroupClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityGroupClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityGroupClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
