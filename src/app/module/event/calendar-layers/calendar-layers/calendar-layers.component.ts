import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, EventEmitter, Input, Output} from '@angular/core';
import {Group} from '../../../../data/remote/model/group/base/group';
import {BaseEventQuery} from '../../../../data/remote/rest-api/query/event/base-event-query';
import {GroupWindowService} from '../../../../services/windows/group-window/group-window.service';

@Component({
  selector: 'app-calendar-layers',
  templateUrl: './calendar-layers.component.html',
  styleUrls: ['./calendar-layers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarLayersComponent {

  @Input()
  public query: BaseEventQuery;

  @Output()
  public readonly queryChange = new EventEmitter();

  public selectedGroups: Group[] = [];

  constructor(private _groupWindowService: GroupWindowService,
              private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public async onEditGroups(): Promise<void> {
    const dialogResult = await this._groupWindowService.openSelectionGroupsWindow(this.selectedGroups, {all: true}, {componentFactoryResolver: this._componentFactoryResolver});
    if (dialogResult.result) {
      this.selectedGroups = dialogResult.data;
      this._updateQuery();
    }
  }

  public onSelectedItemsChange(items: Group[]): void {
    this._updateQuery();
  }

  private _updateQuery(): void {
    if (this.query) {
      this.query.groupIds = this.selectedGroups.map(x => x.id).join('_');
      this.queryChange.emit(this.query);
    }
  }

}
