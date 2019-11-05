import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntityPersonStatementComponent } from './legal-entity-person-statement.component';

describe('LegalEntityPesontStatementComponent', () => {
  let component: LegalEntityPersonStatementComponent;
  let fixture: ComponentFixture<LegalEntityPersonStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityPersonStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityPersonStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
