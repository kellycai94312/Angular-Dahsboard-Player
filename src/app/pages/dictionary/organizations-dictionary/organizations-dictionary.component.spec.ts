import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationsDictionaryComponent} from './organizations-dictionary.component';

describe('OrganizationsDictionaryComponent', () => {
  let component: OrganizationsDictionaryComponent;
  let fixture: ComponentFixture<OrganizationsDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
