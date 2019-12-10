import { NamedObject } from 'app/data/remote/base';

export class GroupRequisites extends NamedObject {

  public inn?: string;
  public kpp?: string;
  // ОКТМО
  public oktmo?: string;
  // Имя получателя
  public recipient?: string;
  // Счет получателя
  public recipientPersonalAccount?: string;
  // Банк получателя
  public bankFacility?: string;
  // Сч №
  public account?: string;
  public bik?: string;
  public kbk?: string;
  // Расчетный счет
  public paymentAccount?: string;
  // Корреспондентский счет
  public correspondentAccount?: string;

}
