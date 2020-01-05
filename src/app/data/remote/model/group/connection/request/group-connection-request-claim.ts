import { GroupClaimJoinRequestStateEnum } from 'app/data/remote/model/group';
import { Type } from 'class-transformer';
import { BaseGroupConnectionRequest } from '../base-group-connection-request';
import { GroupConnectionRequestType } from '../group-connection-request-type';
import { GroupConnectionRequestClaimState } from './group-connection-request-claim-state';
import { OrganizationRequisites } from 'app/data/remote/model/group/organization';

// Заявление на создание связи между группами
export class GroupConnectionRequestClaim extends BaseGroupConnectionRequest {

  public headFullName?: string;
  public deputyHeadFullName?: string;
  public headPhone?: string;
  public deputyHeadPhone?: string;
  public headEmail?: string;
  public deputyHeadEmail?: string;

  @Type(() => OrganizationRequisites)
  public requisites?: OrganizationRequisites;

  @Type(() => GroupConnectionRequestClaimState)
  public claimState?: GroupConnectionRequestClaimState;

  public joinRequestStateEnum?: GroupClaimJoinRequestStateEnum;
  public ticketIssuedDate?: Date;
  public ticketNumber?: number;

  constructor() {
    super();
    this.discriminator = GroupConnectionRequestType.REQUEST_CLAIM;
  }

}
