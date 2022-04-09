import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOptionComponent } from './signup-option.component';

describe('SignupOptionComponent', () => {
  let component: SignupOptionComponent;
  let fixture: ComponentFixture<SignupOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
