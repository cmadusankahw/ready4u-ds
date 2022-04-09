import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRatingComponent } from './bill-rating.component';

describe('BillRatingComponent', () => {
  let component: BillRatingComponent;
  let fixture: ComponentFixture<BillRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
