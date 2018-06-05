import {Component, Input, OnInit, Type, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HashSet} from '../../data/local/hash-set';
import {IdentifiedObject} from '../../data/remote/base/identified-object';
import {PageQuery} from '../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-modal-select-page',
  templateUrl: './modal-select-page.component.html',
  styleUrls: ['./modal-select-page.component.scss']
})
export class ModalSelectPageComponent<T extends IdentifiedObject> implements OnInit {

  @Input()
  public header: string;

  @Input()
  public selectedSet: HashSet<T>;

  @Input()
  public component: Type<any>;

  @Input()
  public getListAsync: Function;

  @Input()
  public onSave: Function;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public active: any;
  public dataSet: HashSet<T>;
  private _searchText: string;

  constructor(public modal: NgbActiveModal) {
    this.dataSet = new HashSet();
  }

  async ngOnInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
    await this.updateListAsync();
  }

  async onRemove(obj: any) {
    this.dataSet.add(obj);
    this.selectedSet.remove(obj);
  }

  async onSelect() {
    this.dataSet.remove(this.active);
    this.selectedSet.add(this.active);
  }

  async setActive(obj: any) {
    this.active = obj;
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    const pageContainer = await this.getListAsync(this._searchText == undefined ? '' : this._searchText, from);
    const list = pageContainer.list;
    if (from == 0) {
      this.dataSet.removeAll();
    }

    for (let i = 0; i < list.length; i++) {
      if (!this.selectedSet.contains(list[i])) {
        this.dataSet.add(list[i]);
      }
    }

  }

}
