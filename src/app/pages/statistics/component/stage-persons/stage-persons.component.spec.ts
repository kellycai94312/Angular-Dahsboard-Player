import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StagePersonsComponent} from './stage-persons.component';

describe('StagePersonsComponent', () => {
  let component: StagePersonsComponent;
  let fixture: ComponentFixture<StagePersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StagePersonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
