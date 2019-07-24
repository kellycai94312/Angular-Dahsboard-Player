import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {GroupPersonPosition} from '../../../../data/remote/model/group/position/group-person-position';
import {GroupPersonPositionItemComponent} from '../../../group/group-person-position-item/group-person-position-item/group-person-position-item.component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPersonPositionQuery} from '../../../../data/remote/rest-api/query/group-person-position-query';
import {DialogResult} from '../../../../data/local/dialog-result';

// TODO: Add to group window
@Injectable()
export class EditPersonService {

  public componentFactoryResolver: ComponentFactoryResolver;

  constructor(private _modalBuilderService: ModalBuilderService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _participantRestApiService: ParticipantRestApiService) {
    this.componentFactoryResolver = this._componentFactoryResolver;
  }

  public async showSelectionGroupPersonPositions(items: GroupPersonPosition[], params: { groupId: number, personId: number }): Promise<DialogResult<GroupPersonPosition[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(items, async (query: GroupPersonPositionQuery) => {
        query.unassigned = true;
        return await this._participantRestApiService.getGroupPersonPositions({}, query, params);
      }, GroupPersonPositionItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      {
        minCount: 1,
        componentFactoryResolver: this.componentFactoryResolver,
        compare: (first, second) => {
          return first.position.id == second.position.id;
        }
      }
    );
  }

}
