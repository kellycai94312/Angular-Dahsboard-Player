export enum GroupNotificationType {
  JOIN_PERSON = 'JOIN_PERSON', //пользователь отправил заявку на участие в группе
  JOIN_PERSON_APPROVE = 'JOIN_PERSON_APPROVE', //отправляется пользователю, администратор которой подтвердил его заявку
  JOIN_PERSON_REFUSE = 'JOIN_PERSON_REFUSE', //отправляется пользователю, администратор которой отклонил его заявку
  INVITE_PERSON = 'INVITE_PERSON', //администратор группы пригласил пользователя в группу, отправляется пользователю
  INVITE_PERSON_APPROVE = 'INVITE_PERSON_APPROVE', //пользователь принял приглашение в группу, отправляется администраторам
  INVITE_PERSON_REFUSE = 'INVITE_PERSON_REFUSE', //пользователь отклонил приглашение в группу, отправляется администраторам
  DELETE_PERSON = 'DELETE_PERSON' //отправляется пользователю, которого исключили из участников группы
}
