export class PersonContant {

  public static getBirthDateMin() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 125);
    return date;
  }

  public static getBirthDateMax() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 3);
    return date;
  }

}
