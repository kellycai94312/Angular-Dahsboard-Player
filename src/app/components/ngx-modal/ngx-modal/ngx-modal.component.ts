import {Component, ComponentFactory, ComponentFactoryResolver, Input, Type, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SplitButtonItem} from '../../ngx-split-button/bean/split-button-item';
import {RefDirective} from '../../../directives/ref/ref.directive';
import {INgxContent} from '../bean/ingx-content';
import {NgxModalConfiguration} from '../bean/ngx-modal-configuration';

@Component({
  selector: 'ngx-modal',
  templateUrl: './ngx-modal.component.html',
  styleUrls: ['./ngx-modal.component.scss'],
})
export class NgxModalComponent {

  @Input()
  public title: string;

  @Input()
  public titleKey: string;

  @Input()
  public splitButtonItems: SplitButtonItem[];

  @ViewChild(RefDirective)
  public bodyTemplate: RefDirective;

  public bodyComponentType: Type<any>;

  constructor(public modal: NgbActiveModal,
              private _componentFactoryResolver: ComponentFactoryResolver) {
    this.splitButtonItems = [];
  }

  public async initializeBody<T>(bodyComponentType: Type<T>,
                                 initialize: (component: T) => Promise<void>,
                                 config?: NgxModalConfiguration): Promise<T> {
    this.bodyComponentType = bodyComponentType;
    let componentFactoryResolver = this._componentFactoryResolver;
    let customComponentFactoryResolver = false;
    if (config && config.componentFactoryResolver) {
      customComponentFactoryResolver = true;
      componentFactoryResolver = config.componentFactoryResolver;
    }

    let componentFactory: ComponentFactory<any> = null;
    try {
      componentFactory = componentFactoryResolver.resolveComponentFactory(bodyComponentType);
    } catch (e) {
      if (!customComponentFactoryResolver) {
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(bodyComponentType);
      } else {
        throw e;
      }
    }

    const viewContainerRef = this.bodyTemplate.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance as INgxContent).modal = this.modal;
    // TODO: Use interface for the call this field
    componentRef.instance._manualInit = true;
    await initialize(componentRef.instance);
    componentRef.changeDetectorRef.detectChanges();

    return componentRef.instance;
  }

  public onClose() {
    this.modal.dismiss();
  }

}
