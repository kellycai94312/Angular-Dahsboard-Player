export enum GroupNotificationType {
  JOIN_PERSON = 'JOIN_PERSON', // Пользователь отправил заявку на участие в группе
  JOIN_PERSON_CLAIM = 'JOIN_PERSON_CLAIM', // Пользователь отправил заявление от физического лица в группу
  JOIN_PERSON_APPROVE = 'JOIN_PERSON_APPROVE', // Отправляется пользователю, администратор которой подтвердил его заявку
  JOIN_PERSON_REFUSE = 'JOIN_PERSON_REFUSE', // Отправляется пользователю, администратор которой отклонил его заявку
  JOIN_PERSON_CLAIM_APPROVE = 'JOIN_PERSON_CLAIM_APPROVE', // Отправляется пользователю, администратор которой подтвердил его заявление от физического лица
  JOIN_PERSON_CLAIM_REFUSE = 'JOIN_PERSON_CLAIM_REFUSE', // Отправляется пользователю, администратор которой отклонил его заявление от физического лица
  INVITE_PERSON = 'INVITE_PERSON', // Администратор группы пригласил пользователя в группу, отправляется пользователю
  INVITE_PERSON_APPROVE = 'INVITE_PERSON_APPROVE', // Пользователь принял приглашение в группу, отправляется администраторам
  INVITE_PERSON_REFUSE = 'INVITE_PERSON_REFUSE', // Пользователь отклонил приглашение в группу, отправляется администраторам
  DELETE_PERSON = 'DELETE_PERSON', // Отправляется пользователю, которого исключили из участников группы
  DELETE_PERSON_CLAIM = 'DELETE_PERSON_CLAIM', // Отправляется пользователю, которого исключили из членов группы
  UPDATE_POSITIONS = 'UPDATE_POSITIONS', // Отправляется пользователю, которому обновили должности в группе
  UPDATE_POSITIONS_APPROVE = 'UPDATE_POSITIONS_APPROVE', // Пользователь согласился с изменениями должностей, отправляется создателю группы и редактору должности
  UPDATE_POSITIONS_REFUSE = 'UPDATE_POSITIONS_REFUSE' // Пользователь отказался от изменений должностей, отправляется создателю группы и редактору должности
}
