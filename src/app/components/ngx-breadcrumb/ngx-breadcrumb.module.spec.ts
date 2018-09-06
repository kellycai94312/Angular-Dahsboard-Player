import {NgxBreadcrumbModule} from './ngx-breadcrumb.module';

describe('NgxBreadcrumbModule', () => {
  let ngxBreadcrumbModule: NgxBreadcrumbModule;

  beforeEach(() => {
    ngxBreadcrumbModule = new NgxBreadcrumbModule();
  });

  it('should create an instance', () => {
    expect(ngxBreadcrumbModule).toBeTruthy();
  });
});
