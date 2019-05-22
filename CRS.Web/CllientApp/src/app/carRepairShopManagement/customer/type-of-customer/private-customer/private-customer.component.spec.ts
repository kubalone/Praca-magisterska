import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCustomerComponent } from './private-customer.component';

describe('PrivateCustomerComponent', () => {
  let component: PrivateCustomerComponent;
  let fixture: ComponentFixture<PrivateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
