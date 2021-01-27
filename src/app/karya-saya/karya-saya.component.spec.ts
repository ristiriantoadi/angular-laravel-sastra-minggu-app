import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaryaSayaComponent } from './karya-saya.component';

describe('KaryaSayaComponent', () => {
  let component: KaryaSayaComponent;
  let fixture: ComponentFixture<KaryaSayaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaryaSayaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaryaSayaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
