import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometryHistoryComponent } from './anthropometry-history.component';

describe('AnthropometryHistoryComponent', () => {
  let component: AnthropometryHistoryComponent;
  let fixture: ComponentFixture<AnthropometryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthropometryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthropometryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
