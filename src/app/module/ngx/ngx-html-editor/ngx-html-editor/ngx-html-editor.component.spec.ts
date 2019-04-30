import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxHtmlEditorComponent} from './ngx-html-editor.component';

describe('NgxHtmlEditorComponent', () => {
  let component: NgxHtmlEditorComponent;
  let fixture: ComponentFixture<NgxHtmlEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxHtmlEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
