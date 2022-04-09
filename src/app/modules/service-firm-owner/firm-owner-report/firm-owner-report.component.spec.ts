import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmOwnerReportComponent } from './firm-owner-report.component';

describe('FirmOwnerReportComponent', () => {
  let component: FirmOwnerReportComponent;
  let fixture: ComponentFixture<FirmOwnerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmOwnerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmOwnerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
