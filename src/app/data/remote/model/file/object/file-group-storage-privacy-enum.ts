export enum FileGroupStoragePrivacyEnum {
  PUBLIC = 'PUBLIC', // Файл доступен всем
  GROUP_MEMBER = 'GROUP_MEMBER', // Файл доступен участникам группы
  GROUP_MEMBER_EXCEPT_SERVICE_RECIPIENT = 'GROUP_MEMBER_EXCEPT_SERVICE_RECIPIENT', // Файл доступен участникам группы, имеющим должность уровня Персонал, Специалист и Руководитель
  ADMINISTRATION = 'ADMINISTRATION' // Файл доступен участникам группы, имеющим должность с ролью Администратор и Оператор
}
