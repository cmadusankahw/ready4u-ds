import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderPaymentsComponent } from './serviceprovider-payments.component';

describe('ServiceproviderPaymentsComponent', () => {
  let component: ServiceproviderPaymentsComponent;
  let fixture: ComponentFixture<ServiceproviderPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
