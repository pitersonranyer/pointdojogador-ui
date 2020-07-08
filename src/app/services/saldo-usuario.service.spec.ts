import { TestBed } from '@angular/core/testing';

import { SaldoUsuarioService } from './saldo-usuario.service';

describe('SaldoUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaldoUsuarioService = TestBed.get(SaldoUsuarioService);
    expect(service).toBeTruthy();
  });
});
