import {Component, Input, OnInit} from '@angular/core';
import {SubgroupGroupApiService} from '../../../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import {NgxSelect} from '../../../../ngx/ngx-select/model/ngx-select';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PositionLevelEnum} from '../../../../../data/remote/model/person-position/position-level-enum';
import {GroupApiService} from '../../../../../data/remote/rest-api/api/group/group-api.service';
import {SubgroupGroup} from '../../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {NgxDate} from '../../../../ngx/ngx-date/model/ngx-date';
import {Person} from '../../../../../data/remote/model/person';
import {Group} from '../../../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-subgroup-group-attendance-report',
  templateUrl: './subgroup-group-attendance-report.component.html',
  styleUrls: ['./subgroup-group-attendance-report.component.scss']
})
export class SubgroupGroupAttendanceReportComponent implements OnInit {

  @Input()
  public subgroupGroup: SubgroupGroup;

  @Input()
  public group: Group;

  public headNgxSelect: NgxSelect;
  public specialistNgxSelect: NgxSelect;
  public staffNgxSelect: NgxSelect;
  public dateNgxDate: NgxDate;
  public readonly formGroup = new FormGroup({});

  constructor(private _subgroupGroupApiService: SubgroupGroupApiService,
              private _groupApiService: GroupApiService) {
  }

  public ngOnInit() {
    this.dateNgxDate = new NgxDate();
    this.dateNgxDate.placeholderTranslation = 'date';
    this.dateNgxDate.format = PropertyConstant.dateFormat;
    this.dateNgxDate.required = true;
    this.dateNgxDate.control = new FormControl(void 0, [Validators.required]);
    this.formGroup.setControl('date', this.dateNgxDate.control);

    this._initializeNgxSelect(PositionLevelEnum.HEAD)
      .pipe(
        flatMap(value => {
          this.headNgxSelect = value;
          return this._initializeNgxSelect(PositionLevelEnum.SPECIALIST);
        }),
        flatMap(value => {
          this.specialistNgxSelect = value;
          return this._initializeNgxSelect(PositionLevelEnum.STAFF);
        })
      )
      .subscribe(value => {
        this.staffNgxSelect = value;

        const items = [...this.headNgxSelect.items, ...this.specialistNgxSelect.items, ...this.staffNgxSelect.items];
        this.headNgxSelect.items = items;
        this.specialistNgxSelect.items = items;
        this.staffNgxSelect.items = items;
      });
  }

  public onGetReport(): void {
    const url = this._subgroupGroupApiService.getSubgroupGroupAttendanceReport(
      this.subgroupGroup,
      this.group,
      this.headNgxSelect.control.value,
      this.staffNgxSelect.control.value,
      this.specialistNgxSelect.control.value,
      this.dateNgxDate.control.value
    );
    window.open(url, '_blank');
  }

  private _initializeNgxSelect(positionLevelEnum: PositionLevelEnum): Observable<NgxSelect> {
    const ngxSelect = new NgxSelect();
    ngxSelect.labelTranslation = `positionLevelEnum.${positionLevelEnum}`;
    ngxSelect.required = true;
    ngxSelect.display = (item: Person) => `${item.lastName} ${item.firstName}`;
    ngxSelect.control.setValidators([Validators.required]);
    this.formGroup.setControl(positionLevelEnum.toString(), ngxSelect.control);

    return of(ngxSelect)
      .pipe(
        flatMap(() => this._groupApiService.getPersons(this.subgroupGroup.subgroupGroupItem.subgroupTemplateGroup.group, {positionLevelEnum, count: PropertyConstant.pageSizeMax})),
        map(items => {
          ngxSelect.items = items.list.map(x => x.person);
          return ngxSelect;
        })
      );
  }

}
