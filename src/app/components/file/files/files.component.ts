import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DocumentQuery} from '../../../data/remote/rest-api/query/file/document-query';
import {ViewType} from '../../../data/local/view-type';
import {Document} from '../../../data/remote/model/file/document/document';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {PropertyConstant} from '../../../data/local/property-constant';
import {NgxGridComponent} from '../../ngx-grid/ngx-grid/ngx-grid.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  public readonly propertyConstant = PropertyConstant;
  public readonly viewType = ViewType;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public class: string;

  @Input()
  public objectId: number;

  @Input()
  public fileClass: FileClass;

  @Input()
  public type: ViewType;

  @Input()
  public add: () => Promise<boolean>;

  @Input()
  public edit: (obj: any) => Promise<boolean>;

  @Input()
  public canEdit: boolean;

  @Input()
  public enabledAdd: boolean;

  public documents: Document[];

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  async ngOnInit() {
    if (this.type === ViewType.LIST) {
      this.documents = (await this.fetchItems({objectId: this.objectId, clazz: this.fileClass})).list;
    }
  }

  public fetchItems = async (query: DocumentQuery): Promise<PageContainer<Document>> => {
    if (!this.objectId || !this.fileClass) {
      return;
    }

    query.objectId = this.objectId;
    query.clazz = this.fileClass;

    return await this._participantRestApiService.getDocuments(query);
  };

  public getDocumentUrl(obj: Document): string {
    return this._participantRestApiService.getDocument(obj.id);
  }

  public async reset(): Promise<void> {
    await this.ngxGridComponent.reset();
  }

}
