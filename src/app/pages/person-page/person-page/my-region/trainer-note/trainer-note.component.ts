import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from 'devextreme-angular';
import {MyRegionService} from '../my-region.service';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {NoteType} from '../../../../../data/remote/model/note/base/note-type';
import {NgxVirtualScrollComponent} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ISubscription} from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-trainer-note',
  templateUrl: './trainer-note.component.html',
  styleUrls: ['./trainer-note.component.scss']
})
export class TrainerNoteComponent implements OnInit, OnDestroy {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @ViewChild('name')
  public name: DxTextBoxComponent;

  @ViewChild('phone')
  public phone: DxTextBoxComponent;

  @ViewChild('email')
  public email: DxTextBoxComponent;

  @ViewChild('club')
  public club: DxTextBoxComponent;

  @ViewChild('age')
  public age: DxTextBoxComponent;

  private nameSubscription: ISubscription;
  private phoneSubscription: ISubscription;
  private emailSubscription: ISubscription;
  private clubSubscription: ISubscription;
  private ageSubscription: ISubscription;

  constructor(public myRegionService: MyRegionService) {
  }

  async ngOnInit() {
    this.myRegionService.reset = async () => {
      setTimeout(async () => {
        await this.ngxVirtualScrollComponent.reset();
      });
    };

    await this.myRegionService.initialize(NoteType.TRAINER);

    this.nameSubscription = this.name.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setName(event));
    this.phoneSubscription = this.phone.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setPhone(event));
    this.emailSubscription = this.email.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setEmail(event));
    this.clubSubscription = this.club.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setClub(event));
    this.ageSubscription = this.age.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => this.myRegionService.setAge(event));
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
    this.phoneSubscription.unsubscribe();
    this.emailSubscription.unsubscribe();
    this.clubSubscription.unsubscribe();
    this.ageSubscription.unsubscribe();
  }

}
