import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBlocksComponent } from './event-blocks.component';

describe('EventBlocksComponent', () => {
  let component: EventBlocksComponent;
  let fixture: ComponentFixture<EventBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
