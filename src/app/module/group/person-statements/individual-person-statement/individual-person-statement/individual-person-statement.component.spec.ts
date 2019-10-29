import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPersonStatementComponent } from './individual-person-statement.component';

describe('IndividualPesontStatementComponent', () => {
  let component: IndividualPersonStatementComponent;
  let fixture: ComponentFixture<IndividualPersonStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPersonStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPersonStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
