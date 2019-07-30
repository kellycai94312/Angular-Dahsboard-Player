import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonRepresentativeListComponent} from './person-representative-list.component';

describe('PersonRepresentativeListComponent', () => {
  let component: PersonRepresentativeListComponent;
  let fixture: ComponentFixture<PersonRepresentativeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonRepresentativeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRepresentativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
