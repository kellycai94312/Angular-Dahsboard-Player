import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditRankComponent} from './edit-rank.component';

describe('EditRankComponent', () => {
  let component: EditRankComponent;
  let fixture: ComponentFixture<EditRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditRankComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
