import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonActivationComponent} from './person-activation.component';

describe('PersonActivationComponent', () => {
  let component: PersonActivationComponent;
  let fixture: ComponentFixture<PersonActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonActivationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
