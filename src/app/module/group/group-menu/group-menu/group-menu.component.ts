import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuseNavigation} from '../../../../../@fuse/types';
import {ToolbarService} from '../../../../layout/components/toolbar/services/toolbar.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss']
})
export class GroupMenuComponent implements OnInit, OnDestroy {

  public navigation: FuseNavigation[];
  private _notDestroyed = true;

  constructor(private _toolbarService: ToolbarService) {
  }

  public ngOnInit() {
    this._toolbarService.group$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        if (value) {
          this.navigation = [
            {
              id: 'applications',
              title: '',
              translate: '',
              type: 'group',
              icon: 'apps',
              children: [
                {
                  id: '1',
                  translate: 'Почта',
                  type: 'item',
                  url: 'Почта',
                  disabled: true
                },
                {
                  id: '2',
                  translate: 'Управление персоналом',
                  type: 'collapsable',
                  children: [
                    {
                      id: '21',
                      translate: 'Должности',
                      type: 'item',
                      url: `/group/${value.id}/settings/position`
                    },
                    {
                      id: '22',
                      translate: 'Управление компетенциями',
                      type: 'item',
                      url: 'Управление компетенциями',
                      disabled: true
                    },
                    {
                      id: '23',
                      translate: 'Вакансии',
                      type: 'item',
                      url: `/group/${value.id}/settings/vacancy`
                    },
                    {
                      id: '24',
                      translate: 'Подбор персонала',
                      type: 'item',
                      url: 'Подбор персонала',
                      disabled: true
                    },
                    {
                      id: '25',
                      translate: 'Структура подгрупп',
                      type: 'item',
                      url: `/group/${value.id}/subgroup`
                    }
                  ]
                },
                {
                  id: '3',
                  translate: 'Проектный офис',
                  type: 'collapsable',
                  children: [
                    {
                      id: '31',
                      translate: 'Управление проектами',
                      type: 'item',
                      url: 'Управление проектами',
                      disabled: true
                    },
                    {
                      id: '32',
                      translate: 'Управление иерархии',
                      type: 'item',
                      url: `/group/${value.id}/structure/cluster`
                    },
                    {
                      id: '33',
                      translate: 'Проектный чат',
                      type: 'item',
                      url: 'Проектный чат',
                      disabled: true
                    },
                    {
                      id: '34',
                      translate: 'Аналитика',
                      type: 'item',
                      url: 'Аналитика',
                      disabled: true
                    }
                  ]
                },
                {
                  id: '4',
                  translate: 'Витрина',
                  type: 'item',
                  url: 'Витрина',
                  disabled: true
                },
                {
                  id: '5',
                  translate: 'База знаний',
                  type: 'item',
                  url: 'База знаний',
                  disabled: true
                },
                {
                  id: '6',
                  translate: 'Портфель',
                  type: 'item',
                  url: 'Портфель',
                  disabled: true
                },
                {
                  id: '7',
                  translate: 'Финансы',
                  type: 'item',
                  url: 'Финансы',
                  disabled: true
                },
                {
                  id: '8',
                  translate: 'Хранилище группы',
                  type: 'item',
                  url: 'Хранилище группы',
                  disabled: true
                }
              ]
            }
          ];
        } else {
          delete this.navigation;
        }
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
