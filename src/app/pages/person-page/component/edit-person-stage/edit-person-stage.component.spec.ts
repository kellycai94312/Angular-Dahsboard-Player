import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonStageComponent } from './edit-person-stage.component';

describe('EditPersonStageComponent', () => {
  let component: EditPersonStageComponent;
  let fixture: ComponentFixture<EditPersonStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
