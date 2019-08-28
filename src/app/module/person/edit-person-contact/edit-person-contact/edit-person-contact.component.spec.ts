import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPersonContactComponent} from './edit-person-contact.component';

describe('EditPersonContactComponent', () => {
  let component: EditPersonContactComponent;
  let fixture: ComponentFixture<EditPersonContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPersonContactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
