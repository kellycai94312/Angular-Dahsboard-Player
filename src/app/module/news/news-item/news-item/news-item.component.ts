import {Component, ComponentFactoryResolver, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseNews} from '../../../../data/remote/model/group/news/base-news';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NewsWindowService} from '../../../../services/windows/news-window/news-window.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent extends BaseComponent<BaseNews> {

  @Input()
  public canEdit: boolean;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _newsWindowService: NewsWindowService,
              private _componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this._newsWindowService.openEditNewsWindow(this.data, {componentFactoryResolver: this._componentFactoryResolver});
    if (dialogResult.result) {
      this.data = dialogResult.data;
    }
  }

}
