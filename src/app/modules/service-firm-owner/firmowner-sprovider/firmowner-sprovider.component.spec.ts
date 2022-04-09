import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmownerSproviderComponent } from './firmowner-sprovider.component';

describe('FirmownerSproviderComponent', () => {
  let component: FirmownerSproviderComponent;
  let fixture: ComponentFixture<FirmownerSproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmownerSproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmownerSproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
