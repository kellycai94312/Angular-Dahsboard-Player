import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageStandardDictionaryComponent} from './stage-standard-dictionary.component';

describe('StageStandardDictionaryComponent', () => {
  let component: StageStandardDictionaryComponent;
  let fixture: ComponentFixture<StageStandardDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageStandardDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageStandardDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
