import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmownerDashHomeComponent } from './firmowner-dash-home.component';

describe('FirmownerDashHomeComponent', () => {
  let component: FirmownerDashHomeComponent;
  let fixture: ComponentFixture<FirmownerDashHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmownerDashHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmownerDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
