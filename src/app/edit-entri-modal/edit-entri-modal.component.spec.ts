import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntriModalComponent } from './edit-entri-modal.component';

describe('EditEntriModalComponent', () => {
  let component: EditEntriModalComponent;
  let fixture: ComponentFixture<EditEntriModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEntriModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntriModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
