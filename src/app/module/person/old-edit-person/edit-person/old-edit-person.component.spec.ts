import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OldEditPersonComponent} from './old-edit-person.component';

describe('OldEditPersonComponent', () => {
  let component: OldEditPersonComponent;
  let fixture: ComponentFixture<OldEditPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OldEditPersonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldEditPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
