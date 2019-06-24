import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {TextField} from '../../../../../module/common/item-detail/model/text-field';
import {ActivatedRoute} from '@angular/router';
import {flatMap, skipWhile, takeWhile} from 'rxjs/operators';
import {DeviceApiService} from '../../../../../data/remote/rest-api/api/device/device-api.service';
import {Device} from '../../../../../data/remote/model/device/device';
import {ImageField} from '../../../../../module/common/item-detail/model/image-field';
import {ChipsField} from '../../../../../module/common/item-detail/model/chips-field';
import {ImageType} from '../../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../../data/remote/model/file/base/file-class';
import {ImageFormat} from '../../../../../data/local/image-format';
import {FieldsGroup} from '../../../../../module/common/item-detail/model/fields-group';
import {VideoField} from '../../../../../module/common/item-detail/model/video-field';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements OnInit, OnDestroy {

  public leftFieldsGroups: FieldsGroup[] = [];
  public rightFieldsGroups: FieldsGroup[] = [];
  private _notDestroy = true;

  constructor(private _activatedRoute: ActivatedRoute,
              private _deviceApiService: DeviceApiService,
              private _ngZone: NgZone,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this._activatedRoute.params.pipe(
      takeWhile(() => this._notDestroy),
      skipWhile(value => !value.id),
      flatMap(value => this._deviceApiService.getDevice(value.id))
    ).subscribe((value: Device) => {
      this._ngZone.runOutsideAngular(() => {
        this.leftFieldsGroups = [
          new FieldsGroup('', [
            new TextField('name', value.name),
            new TextField('shortName', value.shortName),
            new TextField('description', value.description),
            new TextField('manufacturerUrl', value.manufacturerResource),
            new ChipsField('parameters', value.parameterVersions.map(x => x.parameter.name))
          ])
        ];
        this.rightFieldsGroups = [
          new FieldsGroup('', [
            new ImageField('', value, ImageType.LOGO, FileClass.DEVICE, ImageFormat.SQUARE),
          ])
        ];
        if (value.videoResource) {
          this.rightFieldsGroups.push(new FieldsGroup('', [
            new VideoField('', value.videoResource)
          ]));
        }
        this._changeDetectorRef.markForCheck();
      });
    });
  }

  ngOnDestroy(): void {
    this._notDestroy = false;
  }

}
