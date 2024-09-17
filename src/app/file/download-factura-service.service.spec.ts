import { TestBed } from '@angular/core/testing';

import { DownloadFacturaServiceService } from './download-factura-service.service';

describe('DownloadFacturaServiceService', () => {
  let service: DownloadFacturaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadFacturaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
