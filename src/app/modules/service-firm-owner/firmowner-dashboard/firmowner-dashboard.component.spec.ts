import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmownerDashboardComponent } from './firmowner-dashboard.component';

describe('FirmownerDashboardComponent', () => {
  let component: FirmownerDashboardComponent;
  let fixture: ComponentFixture<FirmownerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmownerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmownerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
