import { IdentifiedObject } from 'app/data/remote/base';

export class GroupAdditionalInformation extends IdentifiedObject {
  // № свидетельства о государственной регистрации
  public stateRegistrationCertificateNumber?: string;
  // № приказа о аккредитации и название организации, выдавшей его
  public accreditationOrderNumber?: string;
  // ОКВЭД
  public okvad?: string;
  // ОКПО
  public okpo?: string;
}
