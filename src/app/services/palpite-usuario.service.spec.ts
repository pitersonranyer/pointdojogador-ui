import { TestBed } from '@angular/core/testing';

import { PalpiteUsuarioService } from './palpite-usuario.service';

describe('PalpiteUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PalpiteUsuarioService = TestBed.get(PalpiteUsuarioService);
    expect(service).toBeTruthy();
  });
});
