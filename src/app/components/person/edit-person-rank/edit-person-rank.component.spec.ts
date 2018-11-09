import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPersonRankComponent} from './edit-person-rank.component';

describe('EditPersonRankComponent', () => {
  let component: EditPersonRankComponent;
  let fixture: ComponentFixture<EditPersonRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPersonRankComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
