import { TestBed, inject } from '@angular/core/testing';

import { InstitucionesService } from './instituciones.service';

describe('InstitucionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitucionesService]
    });
  });

  it('should be created', inject([InstitucionesService], (service: InstitucionesService) => {
    expect(service).toBeTruthy();
  }));
});
