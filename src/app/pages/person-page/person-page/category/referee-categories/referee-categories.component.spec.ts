import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RefereeCategoriesComponent} from './referee-categories.component';

describe('RefereeCategoriesComponent', () => {
  let component: RefereeCategoriesComponent;
  let fixture: ComponentFixture<RefereeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefereeCategoriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
