import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CareerPersonComponent} from './career-person.component';

describe('CareerPersonComponent', () => {
  let component: CareerPersonComponent;
  let fixture: ComponentFixture<CareerPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareerPersonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
