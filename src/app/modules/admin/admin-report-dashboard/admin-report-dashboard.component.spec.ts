import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportDashboardComponent } from './admin-report-dashboard.component';

describe('AdminReportDashboardComponent', () => {
  let component: AdminReportDashboardComponent;
  let fixture: ComponentFixture<AdminReportDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
