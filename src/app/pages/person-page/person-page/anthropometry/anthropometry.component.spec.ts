import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometryComponent } from './anthropometry.component';

describe('AnthropometryComponent', () => {
  let component: AnthropometryComponent;
  let fixture: ComponentFixture<AnthropometryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthropometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthropometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
