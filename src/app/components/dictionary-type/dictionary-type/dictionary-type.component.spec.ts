import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DictionaryTypeComponent} from './dictionary-type.component';

describe('DictionaryTypeComponent', () => {
  let component: DictionaryTypeComponent;
  let fixture: ComponentFixture<DictionaryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DictionaryTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
