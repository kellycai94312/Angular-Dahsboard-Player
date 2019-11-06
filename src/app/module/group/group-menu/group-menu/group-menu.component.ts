import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolbarService } from 'app/layout/components/toolbar/services/toolbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigation } from '../../../../../@fuse/types';

@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss']
})
export class GroupMenuComponent implements OnInit, OnDestroy {

  public navigation: FuseNavigation[];
  private readonly _destroyComponentSubject = new Subject();

  constructor(private _toolbarService: ToolbarService,
              private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._matIconRegistry.addSvgIcon('personnel-management', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/personnel-management.svg'));
    this._matIconRegistry.addSvgIcon('person-positions', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/person-positions.svg'));
    this._matIconRegistry.addSvgIcon('competency-management', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/competency-management.svg'));
    this._matIconRegistry.addSvgIcon('vacancies', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/vacancies.svg'));
    this._matIconRegistry.addSvgIcon('staff-recruitment', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/staff-recruitment.svg'));
    this._matIconRegistry.addSvgIcon('subgroups-structure', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/subgroups-structure.svg'));
    this._matIconRegistry.addSvgIcon('request', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/request.svg'));
    this._matIconRegistry.addSvgIcon('project-office', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/project-office.svg'));
    this._matIconRegistry.addSvgIcon('hierarchy-management', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/hierarchy-management.svg'));
    this._matIconRegistry.addSvgIcon('analytics', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/analytics.svg'));
    this._matIconRegistry.addSvgIcon('showcase', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/showcase.svg'));
    this._matIconRegistry.addSvgIcon('knowledge-base', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/knowledge-base.svg'));
    this._matIconRegistry.addSvgIcon('briefcase', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/briefcase.svg'));
    this._matIconRegistry.addSvgIcon('finance', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/finance.svg'));
    this._matIconRegistry.addSvgIcon('group-repository', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/group-repository.svg'));
  }

  public ngOnInit(): void {
    this._toolbarService.group$
      .pipe(takeUntil(this._destroyComponentSubject))
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
                  translate: 'email',
                  type: 'item',
                  icon: 'email',
                  url: `/group/${value.id}/settings/email`
                },
                {
                  id: 'personnelManagement',
                  translate: 'personnelManagement',
                  svgIcon: 'personnel-management',
                  type: 'collapsable',
                  children: [
                    {
                      id: 'personPositions',
                      translate: 'personPositions',
                      type: 'item',
                      svgIcon: 'person-positions',
                      url: `/group/${value.id}/settings/position`
                    },
                    // {
                    //   id: 'competencyManagement',
                    //   translate: 'competencyManagement',
                    //   type: 'item',
                    //   url: 'competencyManagement',
                    //   svgIcon: 'competency-management',
                    //   disabled: true
                    // },
                    {
                      id: 'vacancies',
                      translate: 'vacancies',
                      type: 'item',
                      svgIcon: 'vacancies',
                      url: `/group/${value.id}/settings/vacancy`
                    },
                    // {
                    //   id: 'staffRecruitment',
                    //   translate: 'staffRecruitment',
                    //   type: 'item',
                    //   url: 'staffRecruitment',
                    //   svgIcon: 'staff-recruitment',
                    //   disabled: true
                    // },
                    {
                      id: 'subgroupsStructure',
                      translate: 'Штатное расписание',
                      type: 'item',
                      svgIcon: 'subgroups-structure',
                      url: `/group/${value.id}/subgroup`
                    },
                    {
                      id: 'requests',
                      translate: 'requests',
                      type: 'item',
                      svgIcon: 'request',
                      url: `/group/${value.id}/request`
                    }
                  ]
                },
                {
                  id: 'projectOffice',
                  translate: 'projectOffice',
                  svgIcon: 'project-office',
                  type: 'collapsable',
                  children: [
                    // {
                    //   id: 'projectManagement',
                    //   translate: 'projectManagement',
                    //   type: 'item',
                    //   url: 'projectManagement',
                    //   disabled: true
                    // },
                    {
                      id: 'hierarchyManagement',
                      translate: 'Структура кластеров',
                      type: 'item',
                      svgIcon: 'hierarchy-management',
                      url: `/group/${value.id}/structure/cluster`
                    },
                    // {
                    //   id: 'projectChat',
                    //   translate: 'projectChat',
                    //   type: 'item',
                    //   url: 'projectChat',
                    //   disabled: true
                    // },
                    // {
                    //   id: 'analytics',
                    //   translate: 'analytics',
                    //   type: 'item',
                    //   url: 'analytics',
                    //   svgIcon: 'analytics',
                    //   disabled: true
                    // }
                  ]
                },
                // {
                //   id: 'showcase',
                //   translate: 'showcase',
                //   type: 'item',
                //   svgIcon: 'showcase',
                //   url: 'showcase',
                //   disabled: true
                // },
                // {
                //   id: 'knowledgeBase',
                //   translate: 'knowledgeBase',
                //   type: 'item',
                //   url: 'knowledgeBase',
                //   svgIcon: 'knowledge-base',
                //   disabled: true
                // },
                // {
                //   id: 'briefcase',
                //   translate: 'briefcase',
                //   type: 'item',
                //   url: 'briefcase',
                //   svgIcon: 'briefcase',
                //   disabled: true
                // },
                // {
                //   id: 'finance',
                //   translate: 'finance',
                //   type: 'item',
                //   url: 'finance',
                //   svgIcon: 'finance',
                //   disabled: true
                // },
                // {
                //   id: 'groupRepository',
                //   translate: 'groupRepository',
                //   type: 'item',
                //   url: 'groupRepository',
                //   svgIcon: 'group-repository',
                //   disabled: true
                // }
              ]
            }
          ];
        } else {
          delete this.navigation;
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroyComponentSubject.next();
    this._destroyComponentSubject.complete();
  }

}
