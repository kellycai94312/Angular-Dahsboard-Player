import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../common/item-line/model/menu-item';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Person} from '../../../../data/remote/model/person';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {PersonItemType} from '../../menu-person-detail/model/person-item-type';
import {PermissionService} from '../../../../shared/permission.service';
import {takeWhile} from 'rxjs/operators';
import {TemplateModalService} from '../../../../service/template-modal.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent extends BaseComponent<Person> implements OnInit {

  @Input()
  public canEdit: boolean;

  @Input()
  public showHead = true;

  public readonly personItemTypeClass = PersonItemType;
  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public selectedMenuItem: MenuItem;
  public canEditPerson: boolean;
  private _notDestroyed: boolean;

  constructor(private _permissionService: PermissionService,
              private _templateModalService: TemplateModalService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this._permissionService.canEditPerson(this.data)
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this.canEditPerson = value;
      });
  }

  public onSelectedItemChange(item: MenuItem): void {
    this.selectedMenuItem = item;
  }

  public onNavigate(): void {
  }

  public async onEditPerson(): Promise<void> {
    const person = await this._templateModalService.openEditPersonWindow(this.data);
    if (person) {
      this.data = person;
    }
  }

}
