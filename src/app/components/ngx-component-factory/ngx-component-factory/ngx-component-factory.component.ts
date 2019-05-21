import {Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {INgxComponentFactory} from '../model/ingx-component-factory';

@Component({
  selector: 'ngx-component-factory',
  templateUrl: './ngx-component-factory.component.html',
  styleUrls: ['./ngx-component-factory.component.scss']
})
export class NgxComponentFactoryComponent<TComponent extends any, TModel extends any> implements INgxComponentFactory<TComponent, TModel>, OnInit {

  @ViewChild('contentTemplate', {read: ViewContainerRef})
  public contentViewContainerRef: ViewContainerRef;

  @Input()
  public manualInitialization: boolean;

  @Input()
  public componentFactoryResolver: ComponentFactoryResolver;

  // TODO: Remove this field
  @Input()
  public class: string;

  @Input()
  public data: TModel;

  @Input()
  public componentType: Type<TComponent>;

  @Input()
  public initializeComponent: (component: TComponent, data: TModel) => Promise<void>;

  @Input()
  public component: TComponent;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
    this.class = '';
    this.manualInitialization = true;
  }

  async ngOnInit(): Promise<void> {
    if (!this.manualInitialization) {
      await this.initialize(this.componentType, this.data, this.initializeComponent);
    }
  }

  public async initialize(componentType: Type<TComponent>,
                          data: TModel,
                          initialize?: (component: TComponent, data: TModel) => Promise<void>): Promise<TComponent> {
    this.componentType = componentType;
    this.data = data;

    let componentFactoryResolver = this._componentFactoryResolver;
    let customComponentFactoryResolver = false;
    if (this.componentFactoryResolver) {
      customComponentFactoryResolver = true;
      componentFactoryResolver = this.componentFactoryResolver;
    }

    let componentFactory: ComponentFactory<any> = null;
    try {
      componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
    } catch (e) {
      if (!customComponentFactoryResolver) {
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
      } else {
        throw e;
      }
    }

    this.contentViewContainerRef.clear();
    const componentRef = this.contentViewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
    if (initialize) {
      await initialize(componentRef.instance, data);
    }

    this.component = componentRef.instance;
    return componentRef.instance;
  }

}
