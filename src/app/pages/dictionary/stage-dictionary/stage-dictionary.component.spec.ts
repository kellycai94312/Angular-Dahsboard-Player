import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StageDictionaryComponent} from './stage-dictionary.component';

describe('StageDictionaryComponent', () => {
  let component: StageDictionaryComponent;
  let fixture: ComponentFixture<StageDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
