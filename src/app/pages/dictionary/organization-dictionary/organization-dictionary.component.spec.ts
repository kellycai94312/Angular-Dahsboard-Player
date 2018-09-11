import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationDictionaryComponent} from './organization-dictionary.component';

describe('OrganizationDictionaryComponent', () => {
  let component: OrganizationDictionaryComponent;
  let fixture: ComponentFixture<OrganizationDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
