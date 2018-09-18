import {Component, OnInit} from '@angular/core';
import {BreadcrumbItem} from '../../../../components/ngx-breadcrumb/bean/breadcrumb-item';
import {ActivatedRoute} from '@angular/router';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseExercise} from '../../../../data/remote/model/exercise/base/base-exercise';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {AppHelper} from '../../../../utils/app-helper';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {Tag} from '../../../../data/remote/model/tag';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {StringWrapper} from '../../../../data/remote/bean/wrapper/string-wrapper';
import {Measure} from '../../../../data/remote/model/measure';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public readonly imageType = ImageType;
  public readonly propertyConstant = PropertyConstant;

  public fileClass: FileClass;
  public activity: BaseExercise;
  public tags: Tag[];
  public measures: Measure[];
  public youTubeUrl: string;

  private readonly _breadcrumbItem: BreadcrumbItem;

  constructor(private _activatedRoute: ActivatedRoute,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this._breadcrumbItem = this._activatedRoute.routeConfig.data.breadcrumb as BreadcrumbItem;
  }

  async ngOnInit() {
    const activityId = this._activatedRoute.snapshot.params.id;
    this.activity = await this._participantRestApiService.getActivity({activityId: activityId});
    this._breadcrumbItem.name = this.activity.name;
    this.fileClass = this._appHelper.exerciseTypeToFileClass(this.activity.discriminator);
    this.tags = await this._participantRestApiService.getActivityTags({activityId: activityId});
    this.measures = await this._participantRestApiService.getActivityMeasures({activityId: activityId});
  }

  public onEditTags = async () => {
    await this._ngxModalService.showModalTag(this.tags, async selectedItems => {
      this.tags = selectedItems;
    });
  };

  public onEditLoadParameters = async () => {
    await this._ngxModalService.showMeasures(this.measures, async selectedItems => {
      this.measures = selectedItems;
    });
  };

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      this.activity = await this._participantRestApiService.updateActivity(this.activity, {}, {activityId: this.activity.id});
      await this._participantRestApiService.updateActivityTags(
        {
          list: this.tags.map(x => {
            const stringWrapper = new StringWrapper();
            stringWrapper.name = x.name;
            return stringWrapper;
          })
        }, {}, {activityId: this.activity.id});

      await this._participantRestApiService.updateActivityMeasures(
        {
          list: this.measures.map(x => new IdRequest(x.id))
        }, {}, {activityId: this.activity.id});
    });
  };

  public onVideoUrlChanged(val: string) {
    let youTubeUrl = null;
    if (val) {
      const youTubeId = this._appHelper.getYouTubeIdFromUrl(val);
      if (youTubeId) {
        youTubeUrl = `https://www.youtube.com/embed/${youTubeId}`;
      }
    }
    this.youTubeUrl = youTubeUrl;
  }

}
