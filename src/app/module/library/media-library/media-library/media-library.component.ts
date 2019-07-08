import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NgxImageComponent} from '../../../../components/ngx-image/ngx-image/ngx-image.component';

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaLibraryComponent {

  @ViewChild(NgxImageComponent)
  public ngxImageComponent: NgxImageComponent;

  @Input()
  public data: IdentifiedObject;

  @Input()
  public fileClass: FileClass;

  public readonly imageTypeClass = ImageType;

}
