import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditInvoice } from './create-edit-invoice';

describe('CreateEditInvoice', () => {
  let component: CreateEditInvoice;
  let fixture: ComponentFixture<CreateEditInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
