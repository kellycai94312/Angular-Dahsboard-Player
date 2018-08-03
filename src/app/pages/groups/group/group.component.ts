import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GroupViewModel} from '../../../data/local/view-model/group/group-view-model';
import {Group} from '../../../data/remote/model/group/base/group';
import {ImageDimension} from '../../../data/local/image-dimension';
import {ImageComponent} from '../../../components/image/image.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends GroupViewModel implements OnInit {

  @ViewChild(ImageComponent)
  public imageComponent: ImageComponent;

  @Input()
  public dimension: ImageDimension;

  constructor(private _router: Router) {
    super(new Group());
    this.dimension = ImageDimension.W80xH80;
  }

  ngOnInit() {
    this.initialize();
  }

  update(data: Group): void {
    super.update(data);

    // TODO: Set auto-updating to image
    if (this.imageComponent) {
      this.imageComponent.refresh(data.id);
    }
  }

  public async onNavigate() {
    // TODO: Need for reload component
    await this._router.navigate(['/group']);
    await this._router.navigate(['/group', this.data.id]);
  }
}
