import {Injectable} from '@angular/core';
import {IRestMethod, Rest, RestAction, RestHandler, RestParams, RestRequestMethod} from 'rest-core';

export const assetsPath = 'assets';
export const reportsPath = '/reports';
export const jsPath = '/js';

@Injectable()
@RestParams({
  url: assetsPath
})
export class AssetsService extends Rest {

  @RestAction({
    method: RestRequestMethod.Get,
    path: `${reportsPath}/personal_training.mrt`
  })
  getPersonalReport: IRestMethod<void, any>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: `${reportsPath}/game.mrt`
  })
  getGameReport: IRestMethod<void, any>;

  @RestAction({
    method: RestRequestMethod.Get,
    path: `${reportsPath}/person_measure.mrt`
  })
  getPersonMeasure: IRestMethod<void, any>;

  constructor(restHandler: RestHandler) {
    super(restHandler);
  }

  public async setScriptInDocumentIfNotExist(url: string, async: boolean = false): Promise<boolean> {
    if (document.querySelector(`script[src="${url}"]`)) {
      return true;
    }
    try {
      const node = document.createElement('script') as HTMLScriptElement;
      node.src = url;
      node.type = 'text/javascript';
      node.async = async;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
      return true;
    } catch (e) {
    }
    return false;
  }

}
