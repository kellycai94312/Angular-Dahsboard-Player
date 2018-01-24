import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyConstant } from '../../data/local/property-constant';
import { DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss']
})
export class ModalSelectComponent implements OnInit {

  @Input()
  public header: string;

  @Input()
  public defaultData: any[];

  @Input()
  public selectedData: any[];

  @Input()
  public component: Type<any>;

  @Input()
  public filter: Function;

  @Input()
  public onSave: Function;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public active: any;
  public data: any[];
  private _searchText: string;

  constructor(public modal: NgbActiveModal) {
  }

  async ngOnInit() {
    this.data = Object.assign([], this.defaultData);
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        this.search();
      });
  }

  async onRemove(obj: any) {
    this.selectedData.splice(this.selectedData.indexOf(obj), 1);
    this.defaultData.push(obj);
    this.search();
  }

  async onSelect() {
    this.defaultData.splice(this.defaultData.indexOf(this.active), 1);
    this.selectedData.push(this.active);
    this.search();
  }

  async setActive(obj: any) {
    this.active = obj;
  }

  private async search() {
    this.data = [];
    for (const item of this.defaultData) {
      if (this.filter(this._searchText, item)) {
        this.data.push(item);
      }
    }
  }

}
