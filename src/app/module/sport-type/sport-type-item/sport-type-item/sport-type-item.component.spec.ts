import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SportTypeItemComponent} from './sport-type-item.component';

describe('SportTypeItemComponent', () => {
  let component: SportTypeItemComponent;
  let fixture: ComponentFixture<SportTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SportTypeItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
