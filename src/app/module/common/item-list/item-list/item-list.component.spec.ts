import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemListComponent} from './item-list.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent<any, any>;
  let fixture: ComponentFixture<ItemListComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
