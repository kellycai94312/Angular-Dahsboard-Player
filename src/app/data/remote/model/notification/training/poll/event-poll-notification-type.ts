export enum EventPollNotificationType {
  CREATE_EVENT_POLL = 'CREATE_EVENT_POLL', // Создание опроса, отправляется всем участникам тренировки
  APPROVE_POLL_PERSON = 'APPROVE_POLL_PERSON', // Подтверждение прохождения опроса участником, отправляется создателю опроса
}
