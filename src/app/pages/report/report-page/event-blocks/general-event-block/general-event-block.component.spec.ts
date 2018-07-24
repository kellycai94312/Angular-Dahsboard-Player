import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEventBlockComponent } from './general-event-block.component';

describe('GeneralEventBlockComponent', () => {
  let component: GeneralEventBlockComponent;
  let fixture: ComponentFixture<GeneralEventBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEventBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEventBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
