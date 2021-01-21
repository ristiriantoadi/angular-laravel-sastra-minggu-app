import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPemuatanUserComponent } from './laporan-pemuatan-user.component';

describe('LaporanPemuatanUserComponent', () => {
  let component: LaporanPemuatanUserComponent;
  let fixture: ComponentFixture<LaporanPemuatanUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPemuatanUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanPemuatanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
