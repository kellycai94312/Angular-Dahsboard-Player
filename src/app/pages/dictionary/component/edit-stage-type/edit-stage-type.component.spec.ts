import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditStageTypeComponent} from './edit-stage-type.component';

describe('EditStageTypeComponent', () => {
  let component: EditStageTypeComponent;
  let fixture: ComponentFixture<EditStageTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStageTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
