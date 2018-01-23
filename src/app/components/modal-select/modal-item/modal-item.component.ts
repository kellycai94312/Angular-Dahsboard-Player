import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild } from '@angular/core';
import { AdDirective } from '../../ad.directive';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit, AfterViewInit {

  @Input() data: any;

  @Input() component: Type<any>;

  @ViewChild(AdDirective) adHost: AdDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.data;
    componentRef.changeDetectorRef.detectChanges();
  }

}
