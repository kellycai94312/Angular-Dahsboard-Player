import {Component, Input, OnInit} from '@angular/core';
import {GroupClusterApiService} from '../../../../../data/remote/rest-api/api/group-cluster/group-cluster-api.service';
import {GroupCluster} from '../../../../../data/remote/model/group/connection/group-cluster';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSelect} from '../../../../ngx/ngx-select/model/ngx-select';
import {NgxDate} from '../../../../ngx/ngx-date/model/ngx-date';
import {Person} from '../../../../../data/remote/model/person';
import {map} from 'rxjs/operators';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {GroupApiService} from '../../../../../data/remote/rest-api/api/group/group-api.service';
import {PositionLevelEnum} from '../../../../../data/remote/model/person-position/position-level-enum';
import {Observable, zip} from 'rxjs';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {TranslateObjectService} from '../../../../../shared/translate-object.service';
import {WorkTimePeriodEnum} from '../../../../../data/remote/model/group/contract/work-time-period-enum';

@Component({
  selector: 'app-group-work-time-report',
  templateUrl: './group-work-time-report.component.html',
  styleUrls: ['./group-work-time-report.component.scss']
})
export class GroupWorkTimeReportComponent implements OnInit {

  @Input()
  public groupCluster: GroupCluster;

  @Input()
  public group: Group;

  public readonly formGroup = new FormGroup({});
  public createdByPersonNgxSelect: NgxSelect;
  public checkedByPersonNgxSelect: NgxSelect;
  public secondCheckedByPersonNgxSelect: NgxSelect;
  public accountantPersonNgxSelect: NgxSelect;
  public workTimePeriodNgxSelect: NgxSelect;
  public dateNgxDate: NgxDate;

  constructor(private _groupClusterApiService: GroupClusterApiService,
              private _groupApiService: GroupApiService,
              private _translateObjectService: TranslateObjectService) {
  }

  public ngOnInit() {
    zip(
      this._getPersons(PositionLevelEnum.HEAD),
      this._getPersons(PositionLevelEnum.SPECIALIST),
      this._getPersons(PositionLevelEnum.STAFF),
    )
      .pipe(map((values) => values.reduce((previousValue, currentValue) => [...previousValue, ...currentValue])))
      .subscribe(async (values) => {
        this.createdByPersonNgxSelect = this._initializeNgxSelect('groupWorkTimeReportComponent.createdByPerson', values);
        this.checkedByPersonNgxSelect = this._initializeNgxSelect('groupWorkTimeReportComponent.checkedByPerson', values);
        this.secondCheckedByPersonNgxSelect = this._initializeNgxSelect('groupWorkTimeReportComponent.secondCheckedByPerson', values);
        this.accountantPersonNgxSelect = this._initializeNgxSelect('groupWorkTimeReportComponent.accountantPerson', values);

        this.workTimePeriodNgxSelect = this._initializeNgxSelect('period', []);
        this.workTimePeriodNgxSelect.display = 'name';
        this.workTimePeriodNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<WorkTimePeriodEnum>(WorkTimePeriodEnum, 'WorkTimePeriodEnum');
        this.workTimePeriodNgxSelect.control.setValue(this.workTimePeriodNgxSelect.items [0]);

        this.dateNgxDate = new NgxDate();
        this.dateNgxDate.placeholderTranslation = 'date';
        this.dateNgxDate.format = PropertyConstant.dateFormat;
        this.dateNgxDate.required = true;
        this.dateNgxDate.control = new FormControl(void 0, [Validators.required]);
        this.formGroup.setControl('date', this.dateNgxDate.control);
      });
  }

  public onGetReport(): void {
    const url = this._groupClusterApiService.getGroupWorkTimeReport(
      this.groupCluster,
      this.group,
      this.workTimePeriodNgxSelect.control.value.data,
      this.createdByPersonNgxSelect.control.value,
      this.checkedByPersonNgxSelect.control.value,
      this.secondCheckedByPersonNgxSelect.control.value,
      this.accountantPersonNgxSelect.control.value,
      this.dateNgxDate.control.value
    );
    window.open(url, '_blank');
  }

  private _initializeNgxSelect(labelTranslation: string, items: Person[]): NgxSelect {
    const ngxSelect = new NgxSelect();
    ngxSelect.labelTranslation = labelTranslation;
    ngxSelect.required = true;
    ngxSelect.display = (item: Person) => `${item.lastName} ${item.firstName}`;
    ngxSelect.items = items;

    this.formGroup.setControl(labelTranslation, ngxSelect.control);
    return ngxSelect;
  }

  private _getPersons(positionLevelEnum: PositionLevelEnum): Observable<Person[]> {
    return this._groupApiService
      .getPersons(this.groupCluster.group, {positionLevelEnum, count: PropertyConstant.pageSizeMax})
      .pipe(map(value => value.list.map(x => x.person)));
  }

}
