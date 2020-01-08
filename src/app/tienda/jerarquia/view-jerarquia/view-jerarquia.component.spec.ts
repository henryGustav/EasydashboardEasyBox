import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJerarquiaComponent } from './view-jerarquia.component';

describe('ViewJerarquiaComponent', () => {
  let component: ViewJerarquiaComponent;
  let fixture: ComponentFixture<ViewJerarquiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJerarquiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJerarquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
