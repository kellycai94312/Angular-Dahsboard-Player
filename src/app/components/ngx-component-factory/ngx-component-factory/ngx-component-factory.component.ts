import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {RefDirective} from '../../../directives/ref/ref.directive';
import {INgxComponentFactory} from '../model/ingx-component-factory';

@Component({
  selector: 'ngx-component-factory',
  templateUrl: './ngx-component-factory.component.html',
  styleUrls: ['./ngx-component-factory.component.scss']
})
export class NgxComponentFactoryComponent<TComponent extends any, TModel extends any> implements INgxComponentFactory<TComponent, TModel>, OnInit {

  @ViewChild(RefDirective)
  public refDirective: RefDirective;

  @Input()
  public manualInitialization: boolean;

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

  public async initialize(componentType: Type<TComponent>, data: TModel, initialize?: (component: TComponent, data: TModel) => Promise<void>): Promise<TComponent> {
    this.componentType = componentType;
    this.data = data;

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.refDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
    if (initialize) {
      await initialize(componentRef.instance, data);
    }

    this.component = componentRef.instance;
    return componentRef.instance;
  }

}
