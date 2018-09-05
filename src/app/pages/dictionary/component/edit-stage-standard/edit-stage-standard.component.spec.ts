import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditStageStandardComponent} from './edit-stage-standard.component';

describe('EditStageStandardComponent', () => {
  let component: EditStageStandardComponent;
  let fixture: ComponentFixture<EditStageStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStageStandardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStageStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
