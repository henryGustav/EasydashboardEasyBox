import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVariantsComponent } from './all-variants.component';

describe('AllVariantsComponent', () => {
  let component: AllVariantsComponent;
  let fixture: ComponentFixture<AllVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVariantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
