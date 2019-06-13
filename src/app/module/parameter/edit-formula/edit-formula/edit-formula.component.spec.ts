import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditFormulaComponent} from './edit-formula.component';

describe('EditFormulaComponent', () => {
  let component: EditFormulaComponent;
  let fixture: ComponentFixture<EditFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormulaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
