import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: '',
    translate: '',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'myPage',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard'
      },
      {
        id: 'persons',
        title: 'Persons',
        translate: 'persons.section',
        type: 'item',
        icon: 'person',
        url: '/person'
      },
      {
        id: 'groups',
        title: 'Groups',
        translate: 'groups',
        type: 'item',
        icon: 'group',
        url: '/group'
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'calendar',
        type: 'item',
        icon: 'today',
        url: '/event'
      },
      {
        id: 'conversation',
        title: 'Conversation',
        translate: 'messages.section',
        type: 'item',
        icon: 'chat',
        url: '/conversation'
      }
    ]
  }
];
