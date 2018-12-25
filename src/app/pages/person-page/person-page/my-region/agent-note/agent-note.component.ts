import {debounceTime} from 'rxjs/operators/debounceTime';
import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from 'devextreme-angular';
import {ISubscription} from 'rxjs-compat/Subscription';

import {PropertyConstant} from '../../../../../data/local/property-constant';
import {MyRegionService} from '../my-region.service';
import {NoteType} from '../../../../../data/remote/model/note/base/note-type';
import {NgxGridComponent} from '../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';

// @Component({
//   selector: 'app-agent-note',
//   templateUrl: './agent-note.component.html',
//   styleUrls: ['./agent-note.component.scss']
// })
export class AgentNoteComponent implements OnInit, OnDestroy {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @ViewChild('name')
  public name: DxTextBoxComponent;

  @ViewChild('phone')
  public phone: DxTextBoxComponent;

  @ViewChild('email')
  public email: DxTextBoxComponent;

  @ViewChild('organization')
  public organization: DxTextBoxComponent;

  private nameSubscription: ISubscription;
  private phoneSubscription: ISubscription;
  private emailSubscription: ISubscription;
  private organizationSubscription: ISubscription;

  constructor(public myRegionService: MyRegionService) {
  }

  async ngOnInit() {
    this.myRegionService.reset = async () => {
      setTimeout(async () => {
        await this.ngxGridComponent.reset();
      });
    };

    await this.myRegionService.initialize(NoteType.AGENT);

    this.nameSubscription = this.name.onValueChanged.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(event => this.myRegionService.setName(event));
    this.phoneSubscription = this.phone.onValueChanged.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(event => this.myRegionService.setPhone(event));
    this.emailSubscription = this.email.onValueChanged.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(event => this.myRegionService.setEmail(event));
    this.organizationSubscription = this.organization.onValueChanged.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(event => this.myRegionService.setOrganization(event));
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
    this.phoneSubscription.unsubscribe();
    this.emailSubscription.unsubscribe();
    this.organizationSubscription.unsubscribe();
  }

}
