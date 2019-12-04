import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectWrapper } from '../../../../data/local/object-wrapper';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { SubgroupGroup } from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import { SubgroupGroupApiService } from '../../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import { NgxDate } from '../../../ngx/ngx-date/model/ngx-date';
import { NgxInput } from '../../../ngx/ngx-input/model/ngx-input';

@Component({
  selector: 'app-subgroup-group-receipt',
  templateUrl: './subgroup-group-receipt.component.html',
  styleUrls: ['./subgroup-group-receipt.component.scss']
})
export class SubgroupGroupReceiptComponent implements OnInit {

  @Input()
  public subgroupGroup: SubgroupGroup;

  public readonly kosguNgxInput = new NgxInput();
  public readonly dateNgxDate = new NgxDate();
  public readonly formGroup = new FormGroup({});
  private readonly _personControl = new FormControl([], [Validators.required, Validators.min(1)]);

  constructor(private _subgroupGroupApiService: SubgroupGroupApiService) {
  }

  public ngOnInit(): void {
    this.kosguNgxInput.labelTranslation = 'kosgu';
    this.kosguNgxInput.required = true;
    this.kosguNgxInput.control.setValidators(Validators.required);

    this.dateNgxDate.placeholderTranslation = 'date';
    this.dateNgxDate.required = true;
    this.dateNgxDate.format = PropertyConstant.dateFormat;
    this.dateNgxDate.control = new FormControl(void 0, [Validators.required]);

    this.formGroup.setControl('kosgu', this.kosguNgxInput.control);
    this.formGroup.setControl('date', this.dateNgxDate.control);
    this.formGroup.setControl('person', this._personControl);
  }

  public onSelectedItemsChange(items: ObjectWrapper[]): void {
    this._personControl.setValue(items);
  }

  public onGetReport(): void {
    // TODO: this._subgroupGroupApiService.downloadSubgroupGroupReceipt(this.subgroupGroup, this._personControl.value.map(x => x.data), this.kosguNgxInput.control.value, this.dateNgxDate.control.value)
  }

}
