import { Injectable } from '@angular/core';
import {
  GroupClaimRequestProfileStep1,
  GroupClaimRequestProfileStep2,
  GroupClaimRequestProfileStep3
} from 'app/data/remote/bean/claim';
import { SingleAttributeWrapper } from 'app/data/remote/bean/wrapper/single-attribute-wrapper';
import { GroupClaimJoinRequestStateEnum } from 'app/data/remote/model/group';
import { GroupConnectionRequestClaim } from 'app/data/remote/model/group/connection';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupConnectionRequestClaimApiService {

  private readonly _basePath = `${environment.restUrl}/groupConnectionRequestClaim`;

  constructor(private _apiService: ApiService) {
  }

  public updateGroupClaimJoinRequestState(groupConnectionRequestClaim: GroupConnectionRequestClaim, value: GroupClaimJoinRequestStateEnum): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/joinRequestState`, new SingleAttributeWrapper(value)) as Observable<GroupConnectionRequestClaim>;
  }

  public updateGroupConnectionRequestClaimProfileStep1(groupConnectionRequestClaim: GroupConnectionRequestClaim, value: GroupClaimRequestProfileStep1): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/profile/step1`, value) as Observable<GroupConnectionRequestClaim>;
  }

  public updateGroupConnectionRequestClaimProfileStep2(groupConnectionRequestClaim: GroupConnectionRequestClaim, value: GroupClaimRequestProfileStep2): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/profile/step2`, value) as Observable<GroupConnectionRequestClaim>;
  }

  public updateGroupConnectionRequestClaimProfileStep3(groupConnectionRequestClaim: GroupConnectionRequestClaim, value: GroupClaimRequestProfileStep3): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/profile/step3`, value) as Observable<GroupConnectionRequestClaim>;
  }

  public proceedGroupConnectionRequest(groupConnectionRequestClaim: GroupConnectionRequestClaim): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/proceed`) as Observable<GroupConnectionRequestClaim>;
  }

  public removeGroupConnectionRequestClaim(groupConnectionRequestClaim: GroupConnectionRequestClaim): Observable<GroupConnectionRequestClaim> {
    return this._apiService.removeValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/proceed`) as Observable<GroupConnectionRequestClaim>;
  }

  public leaveGroupConnectionRequestClaim(groupConnectionRequestClaim: GroupConnectionRequestClaim): Observable<GroupConnectionRequestClaim> {
    return this._apiService.removeValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/leave`) as Observable<GroupConnectionRequestClaim>;
  }

  public approveGroupConnectionRequestClaim(groupConnectionRequestClaim: GroupConnectionRequestClaim, ticketNumber: string): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/approve`, new SingleAttributeWrapper(ticketNumber)) as Observable<GroupConnectionRequestClaim>;
  }

  public rejectGroupConnectionRequestClaim(groupConnectionRequestClaim: GroupConnectionRequestClaim): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/reject`) as Observable<GroupConnectionRequestClaim>;
  }

  public issueTicketGroupConnectionRequestClaim(groupConnectionRequestClaim: GroupConnectionRequestClaim): Observable<GroupConnectionRequestClaim> {
    return this._apiService.updateValue(GroupConnectionRequestClaim, `${this._basePath}/${groupConnectionRequestClaim.id}/issueTicket`) as Observable<GroupConnectionRequestClaim>;
  }

}
