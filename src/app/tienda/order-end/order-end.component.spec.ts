import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEndComponent } from './order-end.component';

describe('OrderEndComponent', () => {
  let component: OrderEndComponent;
  let fixture: ComponentFixture<OrderEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
