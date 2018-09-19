import {NgxCarouselModule} from './ngx-carousel.module';

describe('NgxCarouselModule', () => {
  let ngxCarouselModule: NgxCarouselModule;

  beforeEach(() => {
    ngxCarouselModule = new NgxCarouselModule();
  });

  it('should create an instance', () => {
    expect(ngxCarouselModule).toBeTruthy();
  });
});
