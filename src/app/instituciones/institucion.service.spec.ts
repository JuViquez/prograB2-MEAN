import { TestBed, inject } from '@angular/core/testing';

import { InstitucionService } from './institucion.service';

describe('InstitucionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitucionService]
    });
  });

  it('should be created', inject([InstitucionService], (service: InstitucionService) => {
    expect(service).toBeTruthy();
  }));
});
