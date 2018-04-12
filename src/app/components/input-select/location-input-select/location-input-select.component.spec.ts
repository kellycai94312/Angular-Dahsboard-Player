import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInputSelectComponent } from './location-input-select.component';

describe('LocationInputSelectComponent', () => {
  let component: LocationInputSelectComponent;
  let fixture: ComponentFixture<LocationInputSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInputSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
