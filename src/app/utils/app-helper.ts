import {PageContainer} from '../data/remote/bean/page-container';

export class AppHelper {

  public static pushItemsInList<T>(from: number, items: T[], pageContainer: PageContainer<T>): T[] {
    if (pageContainer != null && pageContainer.list != null) {
      if (from <= 0) {
        items = pageContainer.list;
      } else {
        for (let i = 0; i < pageContainer.list.length; i++) {
          items.push(pageContainer.list[i]);
        }
      }
    } else {
      items = [];
    }
    return items;
  }

  public static removeItem<T>(items: T[], item: T) {
    items.splice(items.indexOf(item), 1);
  }

}
