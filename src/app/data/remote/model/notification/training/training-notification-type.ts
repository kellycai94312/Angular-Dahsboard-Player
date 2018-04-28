export enum TrainingNotificationType {
  SCHEDULED_EVENT = 'SCHEDULED_EVENT', // запланированное событие
  UPDATE_DATE = 'UPDATE_DATE', // обновление даты
  UPDATE_LOCATION = 'UPDATE_LOCATION', // обновление локации
  UPDATE_EXERCISES = 'UPDATE_EXERCISES', // обновление тестов/упражений
  ADD_PERSON = 'ADD_PERSON', // добавили персону в тренировку
  ADD_GROUP = 'ADD_GROUP', // добавили группу в тренировку
  DELETE_PERSON = 'DELETE_PERSON', // пользователя исключили
  DELETE_PERSON_SELF = 'DELETE_PERSON_SELF', // вас исключили из тренировки
  APPROVE_PERSON = 'APPROVE_PERSON', // пользователь подтвердил участие
  APPROVE_GROUP = 'APPROVE_GROUP', // тренер группы подтвердил участие
  REFUSE_PERSON = 'REFUSE_PERSON', // пользователь отказался от участия
  REFUSE_GROUP = 'REFUSE_GROUP' // тренер группы отказался от участия
}
