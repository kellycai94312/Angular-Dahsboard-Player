import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsEventBlockComponent } from './persons-event-block.component';

describe('PersonsEventBlockComponent', () => {
  let component: PersonsEventBlockComponent;
  let fixture: ComponentFixture<PersonsEventBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsEventBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsEventBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
