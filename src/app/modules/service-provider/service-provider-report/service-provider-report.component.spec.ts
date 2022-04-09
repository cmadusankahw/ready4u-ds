import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderReportComponent } from './service-provider-report.component';

describe('ServiceProviderReportComponent', () => {
  let component: ServiceProviderReportComponent;
  let fixture: ComponentFixture<ServiceProviderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
