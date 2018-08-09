import { HtmlContentModule } from './html-content.module';

describe('HtmlContentModule', () => {
  let htmlContentModule: HtmlContentModule;

  beforeEach(() => {
    htmlContentModule = new HtmlContentModule();
  });

  it('should create an instance', () => {
    expect(htmlContentModule).toBeTruthy();
  });
});
