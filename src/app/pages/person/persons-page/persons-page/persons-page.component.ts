import {Component} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {Person} from '../../../../data/remote/model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {Tab} from '../../../../data/local/tab';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _templateModalService: TemplateModalService) {
    const addSplitButtonItem: SplitButtonItem = {
      nameKey: 'add',
      callback: async () => {
        if (await this._templateModalService.showEditPersonModal(new Person())) {
          await this._router.navigate([], {relativeTo: _activatedRoute});
        }
      }
    };

    this.tabs = [
      {
        nameKey: 'myContacts',
        routerLink: 'my',
        splitButtonsItems: [addSplitButtonItem]
      },
      {
        nameKey: 'all',
        routerLink: 'all',
        splitButtonsItems: [addSplitButtonItem]
      }
    ];
  }

}
