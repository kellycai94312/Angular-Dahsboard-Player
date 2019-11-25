export enum GroupClaimStateEnum {
  JOIN_REQUEST = 'JOIN_REQUEST', // Пользователь отправил заявление.
  PROCEEDING = 'PROCEEDING', // Заявление отправлено на рассмотрение, после нажатия кнопки «На рассмотрение».
  APPROVED = 'APPROVED', // При одобрении после рассмотрения заявления.
  REJECTED = 'REJECTED', // При отказе после рассмотрения заявления.
  TICKET_ISSUED = 'TICKET_ISSUED', // После одобрения, при физической выдаче билета.
  TERMINATED_VOLUNTARILY = 'TERMINATED_VOLUNTARILY', // При добровольном отказе от членства
  TERMINATED_FORCIBLY = 'TERMINATED_FORCIBLY' // При отзыве членства федерацией
}
