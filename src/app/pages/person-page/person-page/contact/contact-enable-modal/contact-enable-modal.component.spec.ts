import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactEnableModalComponent} from './contact-enable-modal.component';

describe('ContactEnableModalComponent', () => {
  let component: ContactEnableModalComponent;
  let fixture: ComponentFixture<ContactEnableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEnableModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEnableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
