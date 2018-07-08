import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RefereeCategoryModalComponent} from './referee-category-modal.component';

describe('RefereeCategoryModalComponent', () => {
  let component: RefereeCategoryModalComponent;
  let fixture: ComponentFixture<RefereeCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefereeCategoryModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
