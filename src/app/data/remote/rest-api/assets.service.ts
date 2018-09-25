import {Injectable} from '@angular/core';
import {Rest, RestHandler, RestParams} from 'rest-core';

export const assetsPath = 'assets';

@Injectable()
@RestParams({
  url: assetsPath
})
export class AssetsService extends Rest {

  constructor(restHandler: RestHandler) {
    super(restHandler);
  }

  public async setScriptInDocumentIfNotExist(url: string, async: boolean = false): Promise<boolean> {
    if (document.querySelector(`script[src="${url}"]`)) {
      return true;
    }
    try {
      const node = document.createElement('script') as HTMLScriptElement;
      node.type = 'text/javascript';
      node.src = url;
      node.async = async;
      document.body.appendChild(node);

      if (!async) {
        let loadResolve: any = null;
        const loaded = new Promise((resolve, reject) => {
          loadResolve = resolve;
        });
        const loadListener = val => {
          loadResolve();
        };
        const loadEventName = 'load';
        node.addEventListener(loadEventName, loadListener);
        await loaded;
        node.removeEventListener(loadEventName, loadListener);
      }
      return true;
    } catch (e) {
    }
    return false;
  }

}
