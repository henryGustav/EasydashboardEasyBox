import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJerarquiaComponent } from './add-jerarquia.component';

describe('AddJerarquiaComponent', () => {
  let component: AddJerarquiaComponent;
  let fixture: ComponentFixture<AddJerarquiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJerarquiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJerarquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
