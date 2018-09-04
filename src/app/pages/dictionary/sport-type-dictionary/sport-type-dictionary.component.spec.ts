import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SportTypeDictionaryComponent} from './sport-type-dictionary.component';

describe('SportTypeDictionaryComponent', () => {
  let component: SportTypeDictionaryComponent;
  let fixture: ComponentFixture<SportTypeDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SportTypeDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTypeDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
