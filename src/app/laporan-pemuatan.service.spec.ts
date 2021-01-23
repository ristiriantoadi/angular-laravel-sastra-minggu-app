import { TestBed } from '@angular/core/testing';

import { LaporanPemuatanService } from './laporan-pemuatan.service';

describe('LaporanPemuatanService', () => {
  let service: LaporanPemuatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaporanPemuatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
