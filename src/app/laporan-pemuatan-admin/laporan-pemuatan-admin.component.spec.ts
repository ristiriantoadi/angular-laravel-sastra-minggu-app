import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPemuatanAdminComponent } from './laporan-pemuatan-admin.component';

describe('LaporanPemuatanAdminComponent', () => {
  let component: LaporanPemuatanAdminComponent;
  let fixture: ComponentFixture<LaporanPemuatanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPemuatanAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanPemuatanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
