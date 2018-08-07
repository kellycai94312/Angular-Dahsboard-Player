import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupPersonLogComponent } from './edit-group-person-log.component';

describe('EditGroupPersonLogComponent', () => {
  let component: EditGroupPersonLogComponent;
  let fixture: ComponentFixture<EditGroupPersonLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupPersonLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPersonLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
