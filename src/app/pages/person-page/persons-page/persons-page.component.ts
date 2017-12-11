import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService, RestUrl } from '../../../data/remote/rest-api/participant-rest-api.service';
import { PageContainer } from '../../../data/remote/bean/page-container';
import { Person } from '../../../data/remote/model/person';
import { PageQuery } from '../../../data/remote/rest-api/page-query';
import { PictureClass } from '../../../data/remote/misc/picture-class';
import { PictureType } from '../../../data/remote/misc/picture-type';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit {

  public collectionSize: number;
  public personLogoUrls: Map<number, string>;

  public personPageContainer: PageContainer<Person>;
  public pageSize: number;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.collectionSize = 0;
    this.personLogoUrls = new Map<number, string>();

    this.pageSize = 10;
  }

  async ngOnInit() {
    await this.updateItems(1);
  }

  public getPersonLogoImage(person: Person): string {
    // TODO:
    const logoUrl = `${RestUrl}/picture/download?clazz=${PictureClass[PictureClass.person]}&id=${+person.id}&type=${PictureType[PictureType.LOGO]}`;
    this.personLogoUrls.set(person.id, logoUrl);
    return logoUrl;
  }

  public async onPageChange(selectedPage: number) {
    await this.updateItems(selectedPage);
  }

  public async updateItems(selectedPage: number) {
    let fromPage = (selectedPage - 1) * this.pageSize;
    if (fromPage < 0) {
      fromPage = 0;
    }

    const pageQuery = new PageQuery();
    pageQuery.from = fromPage;
    pageQuery.count = this.pageSize;
    this.personPageContainer = await this._participantRestApiService.getPersonsPage(pageQuery);
    this.collectionSize = this.personPageContainer.total;
  }

}
