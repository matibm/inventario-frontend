import { TestBed } from '@angular/core/testing';

import { SubirArchivoService } from './subir-archivo.service';

describe('SubirArchivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubirArchivoService = TestBed.get(SubirArchivoService);
    expect(service).toBeTruthy();
  });
});
