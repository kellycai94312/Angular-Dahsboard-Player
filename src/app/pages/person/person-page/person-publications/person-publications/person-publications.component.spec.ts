import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonPublicationsComponent} from './person-publications.component';

describe('PersonPublicationsComponent', () => {
  let component: PersonPublicationsComponent;
  let fixture: ComponentFixture<PersonPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonPublicationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
