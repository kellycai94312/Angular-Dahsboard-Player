export enum EventNotificationType {
  EVENT_DELETE = 'EVENT_DELETE', // Создатель события удалил событие
  DATE_UPDATE = 'DATE_UPDATE', // Обновление даты

  //region group
  GROUP_ADD = 'GROUP_ADD', // Добавили группу в событие
  //endregion

  //region person
  PERSON_ADD = 'PERSON_ADD', // Добавили пользователя в событие

  PERSON_DELETE = 'PERSON_DELETE', // Пользователя удалили из события
  PERSON_DELETE_SELF = 'PERSON_DELETE_SELF', // Вас удалили из события

  PERSON_APPROVE = 'PERSON_APPROVE', // Пользователь подтвердил участие в событии
  PERSON_REFUSE = 'PERSON_REFUSE' // Пользователь отказался от участия в событии
  //endregion
}
