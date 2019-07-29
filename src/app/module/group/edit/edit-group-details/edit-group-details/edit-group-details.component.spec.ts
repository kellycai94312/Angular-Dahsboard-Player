import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGroupDetailsComponent} from './edit-group-details.component';

describe('EditGroupDetailsComponent', () => {
  let component: EditGroupDetailsComponent;
  let fixture: ComponentFixture<EditGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
