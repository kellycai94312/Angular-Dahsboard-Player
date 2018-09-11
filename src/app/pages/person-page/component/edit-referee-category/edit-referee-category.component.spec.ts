import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditRefereeCategoryComponent} from './edit-referee-category.component';

describe('EditRefereeCategoryComponent', () => {
  let component: EditRefereeCategoryComponent;
  let fixture: ComponentFixture<EditRefereeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditRefereeCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRefereeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
