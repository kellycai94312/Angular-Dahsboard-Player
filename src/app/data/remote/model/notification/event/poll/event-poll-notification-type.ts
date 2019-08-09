export enum EventPollNotificationType {
  CREATE_EVENT_POLL = 'CREATE_EVENT_POLL', // Создание опроса, отправляется всем участникам события
  COMPLETE_POLL_PERSON = 'COMPLETE_POLL_PERSON' // Подтверждение прохождения опроса участником, отправляется создателю опроса
}
