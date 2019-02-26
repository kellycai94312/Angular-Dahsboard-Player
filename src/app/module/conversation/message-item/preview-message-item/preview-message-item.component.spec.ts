import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMessageItemComponent } from './preview-message-item.component';

describe('PreviewMessageItemComponent', () => {
  let component: PreviewMessageItemComponent;
  let fixture: ComponentFixture<PreviewMessageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewMessageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
