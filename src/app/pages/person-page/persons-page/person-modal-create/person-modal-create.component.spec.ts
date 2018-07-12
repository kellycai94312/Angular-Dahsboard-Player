import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonModalCreateComponent} from './person-modal-create.component';

describe('PersonModalCreateComponent', () => {
  let component: PersonModalCreateComponent;
  let fixture: ComponentFixture<PersonModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonModalCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
