import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGroupConnectionRequestComponent} from './edit-group-connection-request.component';

describe('EditGroupConnectionRequestComponent', () => {
  let component: EditGroupConnectionRequestComponent;
  let fixture: ComponentFixture<EditGroupConnectionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupConnectionRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupConnectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
