import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: '',
    translate: '',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'myPage',
        translate: 'myPage',
        type: 'item',
        icon: 'person',
        url: '/person'
      },
      {
        id: 'diary',
        translate: 'diary',
        type: 'collapsable',
        icon: 'note',
        children: [
          {
            id: 'notebook',
            translate: 'notebook',
            type: 'item',
            url: '/notebook',
            disabled: true
          },
          {
            id: 'targetsAndGoals',
            translate: 'targetsAndGoals',
            type: 'item',
            url: '/targetsAndGoals',
            disabled: true
          },
          {
            id: 'bookmarks',
            translate: 'bookmarks',
            type: 'item',
            url: '/bookmarks',
            disabled: true
          },
          {
            id: 'contacts',
            translate: 'contacts',
            type: 'item',
            url: '/contact/person'
          }
        ]
      },
      {
        id: 'search',
        translate: 'search',
        type: 'item',
        icon: 'search',
        url: '/search'
      },
      {
        id: 'calendar',
        translate: 'organizer',
        type: 'item',
        icon: 'today',
        url: '/event'
      },
      {
        id: 'conversations',
        translate: 'messages.section',
        type: 'item',
        icon: 'chat',
        url: '/conversation'
      },
      {
        id: 'laborExchange',
        translate: 'laborExchange',
        type: 'item',
        icon: 'account_balance',
        url: '/laborExchange',
        disabled: true
      },
      {
        id: 'knowledgeBase',
        translate: 'knowledgeBase',
        type: 'collapsable',
        icon: 'storage',
        children: [
          {
            id: 'templates',
            translate: 'templates',
            type: 'item',
            url: '/templates',
            disabled: true
          }, {
            id: 'publications',
            translate: 'publications',
            type: 'item',
            url: '/publications',
            disabled: true
          }, {
            id: 'knowledgeCollections',
            translate: 'knowledgeCollections',
            type: 'item',
            url: '/knowledgeCollections',
            disabled: true
          }, {
            id: 'dictionaries',
            title: 'Dictionaries',
            translate: 'libraries',
            type: 'item',
            url: '/dictionary'
          }
        ]
      },
      {
        id: 'shops',
        translate: 'shops',
        type: 'item',
        icon: 'shopping_cart',
        url: '/shops',
        disabled: true
      },
      {
        id: 'account',
        translate: 'account',
        type: 'item',
        icon: 'account_balance_wallet',
        url: '/account',
        disabled: true
      },
      {
        id: 'storage',
        translate: 'storage',
        type: 'item',
        icon: 'storage',
        url: '/storage',
        disabled: true
      }
    ]
  }
];
