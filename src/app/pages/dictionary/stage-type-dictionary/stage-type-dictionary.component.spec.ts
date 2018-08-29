import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageTypeDictionaryComponent} from './stage-type-dictionary.component';

describe('StageTypeDictionaryComponent', () => {
  let component: StageTypeDictionaryComponent;
  let fixture: ComponentFixture<StageTypeDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageTypeDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageTypeDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
