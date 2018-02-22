import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureTemplateComponent } from './measure-template.component';

describe('MeasureTemplateComponent', () => {
  let component: MeasureTemplateComponent;
  let fixture: ComponentFixture<MeasureTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
