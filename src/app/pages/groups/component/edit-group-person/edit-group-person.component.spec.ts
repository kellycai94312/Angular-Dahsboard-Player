import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGroupPersonComponent} from './edit-group-person.component';

describe('EditGroupPersonComponent', () => {
  let component: EditGroupPersonComponent;
  let fixture: ComponentFixture<EditGroupPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupPersonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
