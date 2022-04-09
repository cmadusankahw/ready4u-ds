import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyOptionsComponent } from './safety-options.component';

describe('SafetyOptionsComponent', () => {
  let component: SafetyOptionsComponent;
  let fixture: ComponentFixture<SafetyOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
