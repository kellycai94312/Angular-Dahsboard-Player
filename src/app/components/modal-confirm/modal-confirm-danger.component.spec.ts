import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmDangerComponent } from './modal-confirm-danger.component';

describe('ModalConfirmDangerComponent', () => {
  let component: ModalConfirmDangerComponent;
  let fixture: ComponentFixture<ModalConfirmDangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmDangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
