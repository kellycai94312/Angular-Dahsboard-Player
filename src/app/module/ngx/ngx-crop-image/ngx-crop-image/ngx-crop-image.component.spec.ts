import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxCropImageComponent} from './ngx-crop-image.component';

describe('NgxCropImageComponent', () => {
  let component: NgxCropImageComponent;
  let fixture: ComponentFixture<NgxCropImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxCropImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
