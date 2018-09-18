import {Type} from '@angular/core';

export interface INgxComponentFactory<TComponent extends any, TModel extends any> {
  data: any;
  componentType: Type<TComponent>;
  initializeComponent: (component: TComponent, data: TModel) => Promise<void>;
  component: TComponent;

  initialize(component: Type<TComponent>, data: TModel, initialize?: (component: TComponent, data: TModel) => Promise<void>): Promise<TComponent>;
}
