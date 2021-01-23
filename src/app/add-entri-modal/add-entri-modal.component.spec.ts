import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntriModalComponent } from './add-entri-modal.component';

describe('AddEntriModalComponent', () => {
  let component: AddEntriModalComponent;
  let fixture: ComponentFixture<AddEntriModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntriModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntriModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
