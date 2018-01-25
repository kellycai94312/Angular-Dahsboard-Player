import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectComponent } from './modal-select.component';

describe('ModalSelectComponent', () => {
  let component: ModalSelectComponent;
  let fixture: ComponentFixture<ModalSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
