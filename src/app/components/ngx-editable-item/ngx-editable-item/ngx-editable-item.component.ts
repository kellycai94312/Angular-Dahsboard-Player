import {Component, Input, Type, ViewChild} from '@angular/core';
import {NgxComponentFactoryComponent} from '../../ngx-component-factory/ngx-component-factory/ngx-component-factory.component';

@Component({
  selector: 'ngx-editable-item',
  templateUrl: './ngx-editable-item.component.html',
  styleUrls: ['./ngx-editable-item.component.scss']
})
export class NgxEditableItemComponent<TComponent extends any, TModel extends any> {

  @ViewChild(NgxComponentFactoryComponent)
  public ngxComponentFactoryComponent: NgxComponentFactoryComponent<TComponent, TModel>;

  @Input()
  public edit: (component: TComponent) => Promise<void>;

  @Input()
  public canEdit: boolean;

  @Input()
  public afterInitialize: (component: TComponent) => Promise<void>;

  public onEdit = async () => {
    await this.edit(this.ngxComponentFactoryComponent.component);
  };

  public async initialize(componentType: Type<TComponent>, data: TModel, initialize?: (component: TComponent, data: TModel) => Promise<void>): Promise<TComponent> {
    const component = await this.ngxComponentFactoryComponent.initialize(componentType, data, initialize);
    if (this.afterInitialize) {
      await this.afterInitialize(component);
    }
    return component;
  }

}
