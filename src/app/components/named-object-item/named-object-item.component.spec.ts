import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedObjectItemComponent } from './named-object-item.component';

describe('NamedObjectItemComponent', () => {
  let component: NamedObjectItemComponent;
  let fixture: ComponentFixture<NamedObjectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedObjectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedObjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
