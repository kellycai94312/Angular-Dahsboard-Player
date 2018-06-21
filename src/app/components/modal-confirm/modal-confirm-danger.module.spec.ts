import { ModalConfirmDangerModule } from './modal-confirm-danger.module';

describe('ModalConfirmDangerModule', () => {
  let modalConfirmDangerModule: ModalConfirmDangerModule;

  beforeEach(() => {
    modalConfirmDangerModule = new ModalConfirmDangerModule();
  });

  it('should create an instance', () => {
    expect(modalConfirmDangerModule).toBeTruthy();
  });
});
