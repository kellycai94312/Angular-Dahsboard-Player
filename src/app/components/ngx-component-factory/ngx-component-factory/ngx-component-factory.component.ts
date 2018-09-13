import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {RefDirective} from '../../../directives/ref/ref.directive';

@Component({
  selector: 'ngx-component-factory',
  templateUrl: './ngx-component-factory.component.html',
  styleUrls: ['./ngx-component-factory.component.scss']
})
export class NgxComponentFactoryComponent<T extends any> implements OnInit {

  @ViewChild(RefDirective)
  public refDirective: RefDirective;

  @Input()
  public data: any;

  @Input()
  public component: Type<T>;

  @Input()
  public initializeComponent: (component: T, data: any) => Promise<void>;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  async ngOnInit(): Promise<void> {
    await this.initialize(this.component, this.data, this.initializeComponent);
  }

  private async initialize(component: Type<T>, data: any, initialize?: (component: T, data: any) => Promise<void>): Promise<T> {
    this.component = component;
    this.data = data;

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.refDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (initialize) {
      await initialize(componentRef.instance, data);
    }
    componentRef.changeDetectorRef.detectChanges();

    return componentRef.instance;
  }

}
