import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmwonerOrdersComponent } from './firmwoner-orders.component';

describe('FirmwonerOrdersComponent', () => {
  let component: FirmwonerOrdersComponent;
  let fixture: ComponentFixture<FirmwonerOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmwonerOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmwonerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
