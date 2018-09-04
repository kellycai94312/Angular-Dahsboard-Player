import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StagePersonRanksComponent} from './stage-person-ranks.component';

describe('StagePersonRanksComponent', () => {
  let component: StagePersonRanksComponent;
  let fixture: ComponentFixture<StagePersonRanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StagePersonRanksComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagePersonRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
