export enum GroupNotificationType {
  ADD_PERSON = 'ADD_PERSON',  // отправляется администраторам группы, в которую добавили пользователя
  ADD_PERSON_SELF = 'ADD_PERSON_SELF', // отправляется пользователю, которого добавили в группу
  DELETE_PERSON = 'DELETE_PERSON', // отправляется администраторам группы, из которой исключили пользователя
  DELETE_PERSON_SELF = 'DELETE_PERSON_SELF', // отправляется пользователю, которого исключили из группы
  JOIN_PERSON = 'JOIN_PERSON' // пользователь отправил заявку на участие в группе
}
