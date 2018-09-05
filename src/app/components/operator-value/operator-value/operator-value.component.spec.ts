import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OperatorValueComponent} from './operator-value.component';

describe('OperatorValueComponent', () => {
  let component: OperatorValueComponent;
  let fixture: ComponentFixture<OperatorValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorValueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
