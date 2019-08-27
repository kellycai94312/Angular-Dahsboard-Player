export enum PersonPrivacyEnum {
  PUBLIC = 'PUBLIC', // Все
  HIDDEN = 'HIDDEN', // Никто
  CONTACTS = 'CONTACTS', // Только мои контакты
  GROUP_MANAGEMENT = 'GROUP_MANAGEMENT', // Только операторы и администраторы групп, в которых состоит пользователь	по иерархии ничего не передается
  GROUP_PARTICIPANTS = 'GROUP_PARTICIPANTS' // Только участники групп, в которых состоит пользователь
}
