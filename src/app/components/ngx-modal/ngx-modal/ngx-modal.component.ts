import {Component, ComponentFactoryResolver, Input, Type, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SplitButtonItem} from '../../ngx-split-button/bean/split-button-item';
import {RefDirective} from '../../../directives/ref/ref.directive';

@Component({
  selector: 'ngx-modal',
  templateUrl: './ngx-modal.component.html',
  styleUrls: ['./ngx-modal.component.scss']
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

  public async initializeBody<T>(bodyComponentType: Type<T>, initialize: (component: T) => Promise<void>): Promise<T> {
    this.bodyComponentType = bodyComponentType;
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(bodyComponentType);
    const viewContainerRef = this.bodyTemplate.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    await initialize(componentRef.instance);
    componentRef.changeDetectorRef.detectChanges();

    return componentRef.instance;
  }

  public onClose() {
    this.modal.close();
  }

}
