import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedObjectComponent } from './named-object.component';

describe('NamedObjectComponent', () => {
  let component: NamedObjectComponent;
  let fixture: ComponentFixture<NamedObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
