import { Injectable } from '@angular/core';
import { GroupContractServiceMonthPayment } from 'app/data/remote/bean/group-contract-service-month-payment';
import { ReportExtension } from 'app/data/remote/bean/report-extension';
import { GroupContractService } from 'app/data/remote/model/group/contract';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { UtilService } from '../../../../../services/util/util.service';
import { AppHelper } from '../../../../../utils/app-helper';
import { PageContainer } from '../../../bean/page-container';
import { Group } from '../../../model/group/base/group';
import { SubgroupPerson } from '../../../model/group/subgroup/person/subgroup-person';
import { SubgroupGroup } from '../../../model/group/subgroup/subgroup/subgroup-group';
import { Person } from '../../../model/person';
import { IdRequest } from '../../../request/id-request';
import { ListRequest } from '../../../request/list-request';
import { SubgroupPersonListRequest } from '../../../request/subgroup-person-list-request';
import { SubgroupPersonRequest } from '../../../request/subgroup-person-request';
import { SubgroupPersonQuery } from '../../query/subgroup-person-query';
import { ApiService } from '../base/api.service';

@Injectable({
  providedIn: 'root'
})
export class SubgroupGroupApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupGroup`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService,
              private _appHelper: AppHelper) {
  }

  public getSubgroupPersons(subgroupGroup: SubgroupGroup, query: SubgroupPersonQuery): Observable<PageContainer<SubgroupPerson>> {
    return this._apiService.getPageContainer(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, query);
  }

  public createSubgroupPersons(subgroupGroup: SubgroupGroup, value: SubgroupPersonListRequest): Observable<SubgroupPerson[]> {
    return this._apiService.createValue(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, value) as Observable<SubgroupPerson[]>;
  }

  public transferSubgroupPersons(subgroupGroup: SubgroupGroup, value: SubgroupPersonRequest): Observable<SubgroupPerson[]> {
    return this._apiService.updateValue(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, value) as Observable<SubgroupPerson[]>;
  }

  public removeSubgroupPersons(subgroupGroup: SubgroupGroup, values: SubgroupPerson[]): Observable<SubgroupPerson[]> {
    return this._apiService.removeValue(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, null, new ListRequest(values.map(x => new IdRequest(x.id)))) as Observable<SubgroupPerson[]>;
  }

  public getSubgroupGroupAttendanceReport(subgroupGroup: SubgroupGroup,
                                          group: Group,
                                          headPerson: Person,
                                          executorPerson: Person,
                                          specialistPerson: Person,
                                          date: Date): string {
    const query = {
      groupId: group.id,
      headPersonId: headPerson.id,
      executorPersonId: executorPerson.id,
      specialistPersonId: specialistPerson.id,
      date: this._appHelper.dateByFormat(date, 'yyyy-MM')
    };
    return `${this._basePath}/${subgroupGroup.id}/attendance?${this._utilService.getHttpQueryFromObject(this._utilService.clone(query, {excludeNullable: true}))}`;
  }

  //region Group claim service

  public getSubgroupGroupContractServices(subgroupGroup: SubgroupGroup): Observable<GroupContractService[]> {
    return this._apiService.getValues(GroupContractService, `${this._basePath}/${subgroupGroup.id}/groupContractService`);
  }

  public getSubgroupGroupContractService(subgroupGroup: SubgroupGroup, groupContractService: GroupContractService): Observable<GroupContractService> {
    return this._apiService.getValue(GroupContractService, `${this._basePath}/${subgroupGroup.id}/groupContractService/${groupContractService.id}`);
  }

  //endregion

  //region Group contract payment

  public getSubgroupGroupContractMonthPayments(subgroupGroup: SubgroupGroup, query: { period: Date }): Observable<GroupContractServiceMonthPayment[]> {
    return this._apiService.getValues(GroupContractServiceMonthPayment, `${this._basePath}/${subgroupGroup.id}/groupContractService/payment`);
  }

  public downloadSubgroupGroupReceipt(subgroupGroup: SubgroupGroup,
                                      query: { period: Date, extension?: ReportExtension },
                                      value: GroupContractServiceMonthPayment[]): Observable<void> {
    query.period = this._appHelper.dateByFormat(query.period, 'yyyy-MM');
    return this._apiService.createValue(void 0, `${this._basePath}/${subgroupGroup.id}/groupContractService/payment/receipt?${this._utilService.getHttpQueryFromObject(this._utilService.clone(query, {excludeNullable: true}))}`, value) as Observable<void>;
  }

  //endregion

}
