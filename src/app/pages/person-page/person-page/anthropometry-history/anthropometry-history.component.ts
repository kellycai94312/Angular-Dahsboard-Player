import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonService} from '../../../person/person-page/service/person.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ActivatedRoute} from '@angular/router';
import {Measure} from '../../../../data/remote/model/measure';
import {AnthropometryQuery} from '../../../../data/remote/rest-api/query/anthropometry-query';
import {PersonAnthropometry} from '../../../../data/remote/model/person-anthropometry';
import {UnitTypeEnum} from '../../../../data/remote/misc/unit-type-enum';
import {RoundPipe} from '../../../../pipes/round.pipe';
import {Unsubscribable} from 'rxjs';

// @Component({
//   selector: 'app-anthropometry-history',
//   templateUrl: './anthropometry-history.component.html',
//   styleUrls: ['./anthropometry-history.component.scss']
// })
export class AnthropometryHistoryComponent implements OnInit, OnDestroy {

  public anthropometries: PersonAnthropometry[];
  public readonly query: AnthropometryQuery;
  public measure: Measure;
  public isNumber: boolean;
  public precision: number;

  private readonly _paramsSubscription: Unsubscribable;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _route: ActivatedRoute,
              private _personService: PersonService,
              private _roundPipe: RoundPipe,
              private _appHelper: AppHelper) {
    this.anthropometries = [];
    this.query = new AnthropometryQuery();
    // this.query.personId = this._personService.personViewModel.data.id;
    this._paramsSubscription = this._route.params.subscribe(params => {
      this.query.measureId = +params.id;
    });
  }

  async ngOnInit() {
    this.measure = await this._participantRestApiService.getMeasureById({
      id: this.query.measureId
    });
    this.isNumber = this.measure.measureUnit.unitTypeEnum.toString() == UnitTypeEnum[UnitTypeEnum.NUMBER];
    if (this.isNumber) {
      this.precision = this.measure.measureUnit.precision;
    }
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._paramsSubscription);
  }

  public setup = async (isNumeric: boolean = false, count: number = PropertyConstant.pageSize) => {
    this.query.isNumeric = isNumeric;
    this.query.count = count;
    return await this.updateListAsync(0);
  };

  public setDateFrom = async (value: Date) => {
    if (value) {
      this.query.dateFrom = this._appHelper.dateByFormat(value, PropertyConstant.dateFormat);
    } else {
      delete this.query.dateFrom;
    }
    return await this.updateListAsync(0);
  };

  public setDateTo = async (value: Date) => {
    if (value) {
      this.query.dateTo = this._appHelper.dateByFormat(value, PropertyConstant.dateFormat);
    } else {
      delete this.query.dateTo;
    }
    return await this.updateListAsync(0);
  };

  public updateListAsync = async (from: number) => {
    this.query.from = from;
    const container = await this._participantRestApiService.getAnthropometryHistory(this.query);
    this.anthropometries = this._appHelper.pushItemsInList(from, this.anthropometries, container);
    return this.anthropometries;
  };

  public getDate = (item: PersonAnthropometry) => {
    return item.created;
  };

  public getUnits = (item: PersonAnthropometry) => {
    return item.measure.measureUnit.shortName;
  };

  public getValue = (item: PersonAnthropometry) => {
    return this.isNumber ? this._roundPipe.transform(parseFloat(item.value), this.precision) : item.value;
  };

}
