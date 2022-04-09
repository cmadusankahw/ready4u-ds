import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFirmownersComponent } from './admin-firmowners.component';

describe('AdminFirmownersComponent', () => {
  let component: AdminFirmownersComponent;
  let fixture: ComponentFixture<AdminFirmownersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFirmownersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFirmownersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
