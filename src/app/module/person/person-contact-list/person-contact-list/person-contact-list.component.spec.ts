import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonContactListComponent} from './person-contact-list.component';

describe('PersonContactListComponent', () => {
  let component: PersonContactListComponent;
  let fixture: ComponentFixture<PersonContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonContactListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
