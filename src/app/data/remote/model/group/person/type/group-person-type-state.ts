export enum GroupPersonTypeState {
  JOIN_REQUEST = 'JOIN_REQUEST', // Пользователь отправил заявку на вступление в группу
  INVITE_REQUEST = 'INVITE_REQUEST', // Пользователю отправили приглашение на вступление в группу
  APPROVED = 'APPROVED', // Пользователь является участником группы
  FOLLOWING = 'FOLLOWING' // Пользователь подписан на группу (запрос на вступление отклонили)
}
