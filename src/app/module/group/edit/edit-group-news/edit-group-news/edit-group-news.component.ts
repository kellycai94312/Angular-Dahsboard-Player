import {Component, Input, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';
import {BaseGroupNews} from '../../../../../data/remote/model/group/news/base-group-news';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {TemplateModalService} from '../../../../../service/template-modal.service';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../utils/app-helper';
import {AppModule} from '../../../../../app.module';
import {GroupNews} from '../../../../../data/remote/model/group/news/group-news';
import {NgxInput} from '../../../../ngx/ngx-input/model/ngx-input';
import {Validators} from '@angular/forms';
import {ValidationService} from '../../../../../service/validation/validation.service';

@Component({
  selector: 'app-edit-group-news',
  templateUrl: './edit-group-news.component.html',
  styleUrls: ['./edit-group-news.component.scss']
})
export class EditGroupNewsComponent extends BaseEditComponent<BaseGroupNews> implements OnInit {

  @Input()
  public group: Group;

  public titleNgxInput: NgxInput;

  private readonly _templateModalService: TemplateModalService;

  constructor(private _validationService: ValidationService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this._templateModalService = AppModule.injector.get(TemplateModalService);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.titleNgxInput = new NgxInput();
    this.titleNgxInput.labelTranslation = 'title';
    this.titleNgxInput.required = true;
    this.titleNgxInput.control.setValidators([Validators.required]);
    this.titleNgxInput.control.setValue((this.data as GroupNews).title);
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeGroupNews({groupId: this.group.id, groupNewsId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    (this.data as GroupNews).title = this.titleNgxInput.control.value;
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.createGroupNews(this.data, {}, {groupId: this.group.id}));
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.updateGroupNews(this.data, {}, {groupId: this.group.id, groupNewsId: this.data.id}));
      }
    });
  }

}
