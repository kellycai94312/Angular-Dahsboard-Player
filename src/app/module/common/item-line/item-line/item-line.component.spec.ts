import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemLineComponent} from './item-line.component';

describe('ItemLineComponent', () => {
  let component: ItemLineComponent<any>;
  let fixture: ComponentFixture<ItemLineComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemLineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
