import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGroupPositionComponent} from './edit-group-position.component';

describe('EditGroupPositionComponent', () => {
  let component: EditGroupPositionComponent;
  let fixture: ComponentFixture<EditGroupPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupPositionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
