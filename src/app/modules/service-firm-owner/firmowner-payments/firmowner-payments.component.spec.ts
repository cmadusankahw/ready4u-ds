import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmownerPaymentsComponent } from './firmowner-payments.component';

describe('FirmownerPaymentsComponent', () => {
  let component: FirmownerPaymentsComponent;
  let fixture: ComponentFixture<FirmownerPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmownerPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmownerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
