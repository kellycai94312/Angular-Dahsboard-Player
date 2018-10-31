import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttachFileComponent} from './attach-file.component';

describe('AttachFileComponent', () => {
  let component: AttachFileComponent<any>;
  let fixture: ComponentFixture<AttachFileComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttachFileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
