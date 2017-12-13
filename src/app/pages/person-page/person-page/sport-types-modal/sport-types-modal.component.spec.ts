import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportTypesModalComponent } from './sport-types-modal.component';

describe('SportTypesModalComponent', () => {
  let component: SportTypesModalComponent;
  let fixture: ComponentFixture<SportTypesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportTypesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTypesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
